import {
  Box,
  Spinner,
  Text,
  FormControl,
  Input,
  HStack,
  Heading,
} from 'native-base';
import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, StyleSheet} from 'react-native';
import {Center} from '../../../layouts/Center';
import {getLotInfo} from '../../../services/public';
import {getUserInfo, getLotId} from '../../../utils/user';
import {getYieldInfo} from '../../../services/trackOut';
import {IColProps} from '../../../types/Table';
import {Controller, useForm} from 'react-hook-form';
import TableV2 from '../../../components/TableV2';
import {TrackOutFormTypes} from './ActionTrackOut';
import {scrapProps} from './Scrap';

export interface TrackOutProps {
  lotId?: string;
  remainder?: number;
  operId?: string;
  eqpId?: string;
  stepID?: string;
  assemblyLotID?: string;
  chipName?: string;
  packageType?: string;
  deviceQty?: string;
  productID?: string;
  materialBoxBarcode?: string;
  trOperID?: string;
  testedQty?: string;
  jobNum?: string;
  quotaCode?: string;
  lotHistoryId?: string;
}
interface IFormItemProps {
  label: string;
  prop: keyof TrackOutProps;
}

interface yieldProps {
  trOperID: string;
  testedQty: string;
  quotaCode: string;
}

const yieldColumns: IColProps<yieldProps>[] = [
  {title: '作业员', dataIndex: 'trOperID'},
  {title: '作业数量', dataIndex: 'testedQty'},
  {title: '定额代码', dataIndex: 'quotaCode'},
];

const formItems: IFormItemProps[] = [
  {label: '机台号', prop: 'eqpId'},
  {label: '批号', prop: 'lotId'},
  {label: '剩余数量', prop: 'remainder'},
  {label: '工序', prop: 'stepID'},
  {label: '组装批号', prop: 'assemblyLotID'},
  {label: '芯片名', prop: 'chipName'},
  {label: '封装形式', prop: 'packageType'},
  {label: '批次数量', prop: 'deviceQty'},
  {label: '品名', prop: 'productID'},
  {label: '料盒条码信息', prop: 'materialBoxBarcode'},
];

const BaseInfoTrackIn: React.FC<{
  scrappedList: scrapProps[];
  ref: React.ForwardedRef<unknown>;
}> = forwardRef(({scrappedList}, ref) => {
  const [loading, setLoading] = useState<boolean>(false);
  // 重新赋值给父组件
  const [formValues, setFormValues] = useState<TrackOutFormTypes>({
    deviceQty: '0',
    jobNum: '0',
    lotHistoryId: '0',
    remainingQty: '0',
    knownJobs: 0,
  });
  const [yieldlSource, setYieldSource] = useState<yieldProps[]>([]);
  const {handleSubmit, control, setValue, getValues} = useForm<TrackOutProps>();
  const deviceQty = getValues('deviceQty');

  const getLotCard = useCallback(() => {
    const initForm = async () => {
      setLoading(true);
      try {
        const {eqpid} = await getUserInfo();
        const currentLotId = await getLotId();
        const res = await getLotInfo({
          eqpId: eqpid,
          lotId: currentLotId!,
        });
        const yieldList = await getYieldInfo({
          eqpId: eqpid,
          lotId: currentLotId!,
        });
        setValue('eqpId', res.data.eqpId);
        for (const [key, value] of Object.entries(res.data)) {
          setValue(key as keyof TrackOutProps, value as string);
        }
        setFormValues(prevState => {
          return {
            ...prevState,
            deviceQty: res.data.deviceQty,
            lotHistoryId: res.data.lotHistoryId,
          };
        });

        setYieldSource(yieldList.data);

        // setYieldSource([{trOperID: '123', testedQty: 20, quotaCode: '123'}, {trOperID: '1223', testedQty: 10, quotaCode: '123'}]);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    initForm();
  }, [setValue]);

  useEffect(() => {
    getLotCard();
    return () => {
      setLoading(false);
    };
  }, [getLotCard]);

  useEffect(() => {
    const scrappedCount = scrappedList
      .map(v => Number(v.qty))
      .reduce((total: number, current: number) => {
        return total + current;
      }, 0);
    setValue('remainder', Number(deviceQty) - scrappedCount || 0);
  }, [scrappedList, setValue, deviceQty]);

  const getRemainderNums = (data: TrackOutFormTypes) => {
    const isKnownNums = yieldlSource
      .map(v => Number(v.testedQty))
      .reduce((total: number, current: number) => {
        return total + current;
      }, 0);
    // const deviceQty = getValues('deviceQty');
    // const remainNums = Number(deviceQty) - isKnownNums - Number(data.jobNum);
    // setValue('remainder', remainNums.toString());
    setFormValues(prevState => {
      return {
        ...prevState,
        // remainingQty: remainNums.toString(),
        jobNum: data.jobNum,
        knownJobs: isKnownNums,
      };
    });
  };

  useImperativeHandle(ref, () => {
    // 第二个参数为init的值, 想要传递正确的参数给外界则需要重新render设置init值
    return {
      formValues: formValues,
    };
  });

  if (loading) {
    return (
      <Box bg="white" maxWidth="100%" p={2} mt={2} rounded="lg" minHeight={200}>
        <Center>
          <Spinner color="blue.500" />
        </Center>
      </Box>
    );
  }

  return (
    <>
      <Box
        bg="white"
        maxWidth="100%"
        p={2}
        mt={2}
        rounded="lg"
        flexDirection="row"
        flexWrap="wrap">
        {formItems.map(item => {
          return (
            <View style={styles.formItemLayout} key={item.label}>
              <Text minW="20%" pl={2}>
                {item.label}:{' '}
              </Text>
              <Controller
                control={control}
                render={({field: {value}}) => <Text>{value}</Text>}
                name={item.prop}
              />
            </View>
          );
        })}
      </Box>
      <Box bg="white" rounded="lg" width="100%" marginTop={5} p={2}>
        <Heading fontSize={16}>产量信息</Heading>
        <HStack space={3} alignItems="center" mb={6}>
          <FormControl style={styles.formItem}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              作业员
            </FormControl.Label>
            <Controller
              control={control}
              render={({field: {value}}) => <Input isDisabled value={value} />}
              name="operId"
            />
          </FormControl>
          <FormControl style={styles.formItem}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              作业数量
            </FormControl.Label>
            <Controller
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={text => {
                    const val = text.replace(/[^0-9]/g, '');
                    onChange(val);
                  }}
                  onBlur={handleSubmit(getRemainderNums)}
                />
              )}
              name="jobNum"
            />
          </FormControl>
          <FormControl style={styles.formItem}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              定额代码
            </FormControl.Label>
            <Controller
              control={control}
              render={({field: {value}}) => <Input isDisabled value={value} />}
              name="quotaCode"
            />
          </FormControl>
        </HStack>
        <TableV2 dataSource={yieldlSource} columns={yieldColumns} />
      </Box>
    </>
  );
});

const styles = StyleSheet.create({
  formItemLayout: {
    width: '50%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  formItem: {
    width: '30%',
  },
});

export default BaseInfoTrackIn;
