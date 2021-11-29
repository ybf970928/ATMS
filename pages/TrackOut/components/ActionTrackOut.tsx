import React, {useRef, useContext, useState} from 'react';
import {Box, HStack, useToast, Text, Button} from 'native-base';
import Scrap, {scrapProps} from './Scrap';
import InfosTable from './InfosTable';
import AutoInputs from '../../../components/AutoInputs';
import UserCard from './UserCard';
import {doTrackOut} from '../../../services/trackOut';
import {getLotId, getUserInfo} from '../../../utils/user';
import {removeLotId} from '../../../utils/user';
import {ToastMessage} from '../../../utils/errorMessageMap';
// import {useNavigation, CommonActions} from '@react-navigation/native';
import {AuthContext} from '../../../layouts/AuthProvider';

export interface TrackOutFormTypes {
  deviceQty?: string;
  jobNum?: string;
  lotHistoryId?: string;
  remainingQty?: string;
  knownJobs?: number;
}

const CardTable: React.FC = () => {
  // 通过各种绑定ref来获取 FC 内部的参数
  const userWriteRef = useRef<{formValues: TrackOutFormTypes}>({
    formValues: {
      deviceQty: '',
      jobNum: '',
      lotHistoryId: '',
      remainingQty: '',
      knownJobs: 0,
    },
  });
  const scrapRef = useRef<{state: scrapProps[]}>(null);
  const defectiveRef = useRef<{state: scrapProps[]}>(null);
  const autoInputRef = useRef<{values: String[]}>(null);
  const [scrappedList, setScrappedList] = useState<scrapProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const navigation = useNavigation();
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const {checkTrackOut} = useContext(AuthContext);
  const toast = useToast();

  const validNums: () => boolean = () => {
    // 报废数量
    const scrapNum = (scrapRef.current!.state || [])
      .map(v => Number(v.qty))
      .reduce((total: number, current: number) => {
        return total + current;
      }, 0);
    // 次品数量
    const defectiveNum = (defectiveRef.current!.state || [])
      .map(v => Number(v.qty))
      .reduce((total: number, current: number) => {
        return total + current;
      }, 0);
    const {jobNum, deviceQty, knownJobs} = userWriteRef.current.formValues;
    // console.log(
    //   '作业总数数:' + (Number(jobNum) + Number(knownJobs)),
    //   '批次总数:' + deviceQty,
    // );
    // console.log('报废总数:' + scrapNum, '次品总数:' + defectiveNum);
    // if (Number(jobNum) + Number(knownJobs) > Number(deviceQty)) {
    //   toast.show({
    //     title: '作业总数有误',
    //   });
    //   console.log('作业总数有误');

    //   return false;
    // } else {
    //   if (
    //     scrapNum >
    //     Number(deviceQty) - (Number(jobNum) + Number(knownJobs)) - defectiveNum
    //   ) {
    //     toast.show({
    //       title: '报废数量有误',
    //     });
    //     console.log('报废数量有误');

    //     return false;
    //   } else if (
    //     defectiveNum >
    //     Number(deviceQty) - (Number(jobNum) + Number(knownJobs)) - scrapNum
    //   ) {
    //     toast.show({
    //       title: '次品数量有误',
    //     });
    //     console.log('次品数量有误');

    //     return false;
    //   }
    // }
    if (Number(jobNum) + Number(knownJobs) > Number(deviceQty)) {
      toast.show({
        title: '作业总数有误',
      });
      return false;
    } else if (scrapNum > Number(deviceQty)) {
      toast.show({
        title: '报废数量有误',
      });

      return false;
    } else if (defectiveNum > Number(deviceQty)) {
      toast.show({
        title: '次品数量有误',
      });

      return false;
    } else if (
      scrapNum + defectiveNum + Number(jobNum) + Number(knownJobs) !==
      Number(deviceQty)
    ) {
      toast.show({
        title: '总数计算有误',
      });

      return false;
    }
    return scrapNum + defectiveNum + Number(jobNum) + Number(knownJobs) ===
      Number(deviceQty)
      ? true
      : false;
  };

  const validBox: () => boolean = () => {
    if (!autoInputRef.current!.values.length) {
      toast.show({
        title: '料盒信息填写至少一个',
      });
      return false;
    } else {
      return true;
    }
  };

  const trackInSucc = async () => {
    setIsLoading(true);
    try {
      const {eqpid} = await getUserInfo();
      const currentLotId = await getLotId();
      const res = await doTrackOut({
        lotHistoryId: userWriteRef.current.formValues.lotHistoryId,
        eqpId: eqpid,
        lotId: currentLotId!,
        remainingQty: userWriteRef.current.formValues.remainingQty,
        jobNum: userWriteRef.current.formValues.jobNum,
        scrapList: scrapRef.current!.state,
        defectiveList: defectiveRef.current!.state,
        boxs: autoInputRef.current!.values.join(','),
      });
      if (res.code === 1) {
        removeLotId().then(() => {
          checkTrackOut(true);
          setIsLoading(false);
          setDisabled(true);
          // navigation.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [{name: 'Home'}],
          //   }),
          // );
        });
      } else {
        setIsLoading(false);
        setDisabled(false);
      }
      toast.show({
        title: ToastMessage(res),
      });
    } catch (error) {
      setIsLoading(false);
      setDisabled(false);
      toast.show({
        title: '结批失败',
      });
    }
  };

  const handleTrackIn = async () => {
    if (validNums() && validBox()) {
      trackInSucc();
    } else {
      validNums() && validBox();
    }
  };

  const getScrappedList = (list: scrapProps[]) => {
    setScrappedList(list);
  };

  return (
    <>
      <UserCard ref={userWriteRef} scrappedList={scrappedList} />
      <InfosTable />
      <Box
        bg="white"
        rounded="lg"
        width="100%"
        marginBottom={5}
        marginTop={5}
        p={2}>
        <HStack>
          <Text fontSize={16} color="blue.500">
            料盒信息
          </Text>
          <Text fontSize={16} color="red.600" pl={1}>
            *
          </Text>
        </HStack>
        <HStack flexWrap="wrap" mt={6}>
          <AutoInputs ref={autoInputRef} />
        </HStack>
      </Box>
      <Scrap type="报废数量" ref={scrapRef} addScrapped={getScrappedList} />
      <Scrap type="次品数量" ref={defectiveRef} />
      <Box width="100%" marginBottom={5} p={2}>
        <Button
          _loading={{
            bg: 'blue.500',
            _text: {
              color: '#FFFFFF',
            },
          }}
          isDisabled={isDisabled}
          onPress={handleTrackIn}
          isLoading={isLoading}>
          确认出机
        </Button>
      </Box>
    </>
  );
};

export default CardTable;
