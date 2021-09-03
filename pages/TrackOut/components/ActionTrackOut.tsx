import React, {useRef} from 'react';
import {Box, Heading, Button, HStack, useToast} from 'native-base';
import Scrap, {scrapProps} from './Scrap';
import InfosTable from './InfosTable';
import AutoInputs from '../../../components/AutoInputs';
import UserCard from './UserCard';
import {doTrackOut} from '../../../services/trackOut';
import {getLotId, getUserInfo} from '../../../utils/user';
import {ToastMessage} from '../../../utils/errorMessageMap';
const CardTable: React.FC = () => {
  const userWriteRef = useRef<{
    formValues: {remainingQty: string; jobNum: string; lotHistoryId: string};
  }>(null);
  const scrapRef = useRef<{state: scrapProps[]}>(null);
  const defectiveRef = useRef<{state: scrapProps[]}>(null);
  const autoInputRef = useRef<{values: String[]}>(null);
  const toast = useToast();

  const isExceed: () => boolean = () => {
    const scrapNum = scrapRef
      .current!.state.map(v => Number(v.qty))
      .reduce((total: number, current: number) => {
        return total + current;
      }, 0);
    const defectiveNum = defectiveRef
      .current!.state.map(v => Number(v.qty))
      .reduce((total: number, current: number) => {
        return total + current;
      }, 0);
    const remainingQty = userWriteRef.current?.formValues.remainingQty;
    return Number(remainingQty) < scrapNum + defectiveNum ? true : false;
  };

  const trackInSucc = async () => {
    const {eqpid} = await getUserInfo();
    const currentLotId = await getLotId();
    try {
      const res = await doTrackOut({
        lotHistoryId: userWriteRef.current?.formValues.lotHistoryId,
        eqpId: eqpid,
        lotId: currentLotId!,
        remainingQty: userWriteRef.current?.formValues.remainingQty,
        jobNum: userWriteRef.current?.formValues.jobNum,
        scrapList: scrapRef.current!.state,
        defectiveList: defectiveRef.current!.state,
        boxs: autoInputRef.current!.values.join(','),
      });
      if (res.code === 1) {
        console.log('结批成功');
      }
      toast.show({
        title: ToastMessage(res),
      });
    } catch (error) {
      toast.show({
        title: '结批失败',
      });
    }
  };

  const handleTrackIn = async () => {
    if (isExceed()) {
      toast.show({
        title: '数量填写有误',
      });
    } else {
      trackInSucc();
    }
  };

  return (
    <>
      <UserCard ref={userWriteRef} />
      <InfosTable />
      <Box
        bg="white"
        rounded="lg"
        width="100%"
        marginBottom={5}
        marginTop={5}
        p={2}>
        <Heading fontSize={16}>料盒信息</Heading>
        <HStack flexWrap="wrap" mt={6}>
          <AutoInputs ref={autoInputRef} />
        </HStack>
      </Box>
      <Scrap type="报废数量" ref={scrapRef} />
      <Scrap type="次品数量" ref={defectiveRef} />
      <Box width="100%" marginBottom={5} p={2}>
        <Button onPress={handleTrackIn}>确认出机</Button>
      </Box>
    </>
  );
};

export default CardTable;
