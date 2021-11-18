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

export interface TrackOutProps {
  lotId?: string;
  remainder?: string;
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

// 材料信息
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

const BaseInfoTrackIn: React.FC<{ref: React.ForwardedRef<unknown>}> =
  forwardRef((_, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    // 重新赋值给父组件
    const [formValues, setFormValues] = useState<{
      remainingQty?: string;
      jobNum?: string;
      lotHistoryId?: string;
    }>({});
    const [yieldlSource, setYieldSource] = useState<yieldProps[]>([]);
    const {handleSubmit, control, setValue, getValues} =
      useForm<TrackOutProps>();

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
          setValue('eqpId', eqpid);
          for (const [key, value] of Object.entries(res.data)) {
            setValue(key as keyof TrackOutProps, value as string);
          }
          setYieldSource(yieldList.data);
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

    const getRemainderNums = (data: yieldProps) => {
      const isKnownNums = yieldlSource
        .map(v => Number(v.testedQty))
        .reduce((total: number, current: number) => {
          return total + current;
        }, 0);
      const allNums = getValues('deviceQty');
      const lotHistoryId = getValues('lotHistoryId');
      const remainNums = Number(allNums) - isKnownNums - Number(data.testedQty);
      setValue('remainder', remainNums.toString());
      setFormValues({
        remainingQty: remainNums.toString(),
        jobNum: data.testedQty,
        lotHistoryId: lotHistoryId,
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
        <Box
          bg="white"
          maxWidth="100%"
          p={2}
          mt={2}
          rounded="lg"
          minHeight={200}>
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
                render={({field: {value}}) => (
                  <Input isDisabled value={value} />
                )}
                name="trOperID"
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
                    onChangeText={onChange}
                    onBlur={handleSubmit(getRemainderNums)}
                  />
                )}
                name="testedQty"
              />
            </FormControl>
            <FormControl style={styles.formItem}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                定额代码
              </FormControl.Label>
              <Controller
                control={control}
                render={({field: {value}}) => (
                  <Input isDisabled value={value} />
                )}
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
