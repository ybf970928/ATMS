import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Input, Box, VStack, FormControl} from 'native-base';
// import BaseInfoTrackIn from './components/BaseInfo';
import {useForm, Controller} from 'react-hook-form';
import CardTable from './components/CardTable';
import {getEqpId} from '../../utils/user';
import {getLotInfo} from '../../services/public';

interface IFormProps {
  lotId?: string;
  operId?: string;
  eqpId?: string;
  stepID?: string;
  assemblyLotID?: string;
  chipName?: string;
  packageType?: string;
  deviceQty?: string;
  productID?: string;
  materialBoxBarcode?: string;
}
interface IFormItemProps {
  label: string;
  prop: keyof IFormProps;
}

const formItems: IFormItemProps[] = [
  {label: '作业员', prop: 'operId'},
  {label: '机台号', prop: 'eqpId'},
  {label: '工序', prop: 'stepID'},
  {label: '组装批号', prop: 'assemblyLotID'},
  {label: '芯片名', prop: 'chipName'},
  {label: '封装形式', prop: 'packageType'},
  {label: '批次数量', prop: 'deviceQty'},
  {label: '品名', prop: 'productID'},
  {label: '料盒条码信息', prop: 'materialBoxBarcode'},
];

const TrackIn: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm();
  const [inputValue, setInputValue] = useState<string>('');
  const [trackStatus, setTrackStatus] = useState<0 | 1>(0);
  const [form, setForm] = useState<IFormProps>({});

  const handleKeyDown = async (value: string) => {
    try {
      const eqpId = await getEqpId();
      const res = await getLotInfo({
        eqpId: eqpId,
        lotId: value,
        trackInPage: 0,
      });
      setValue('lotId', res.data.lotId);
      setInputValue(res.data.lotId);
      setForm(res.data);
      setTrackStatus(res.data.trackStatus);
    } catch (error) {}
  };

  useEffect(() => {
    const initForm = async () => {
      try {
        const eqpId = await getEqpId();
        const res = await getLotInfo({
          eqpId: eqpId,
          trackInPage: 0,
        });
        setValue('lotId', res.data.lotId);
        setInputValue(res.data.lotId);
        setForm(res.data);
        setTrackStatus(res.data.trackStatus);
      } catch (error) {}
    };
    initForm();
  }, [setValue]);

  return (
    <ScrollView style={styles.scrollView}>
      <Box
        bg="white"
        maxWidth="100%"
        p={2}
        mt={2}
        rounded="lg"
        flexDirection="row"
        alignItems="center"
        flexWrap="wrap">
        <VStack width="100%" space={4} alignItems="center" mb={2}>
          <FormControl isRequired isInvalid={'lotId' in errors}>
            <FormControl.Label>作业批号: </FormControl.Label>
            <Controller
              control={control}
              rules={{required: '请输入作业批号'}}
              render={({field: {onChange, value}}) => (
                <Input
                  isDisabled={trackStatus ? true : false}
                  w={'100%'}
                  onSubmitEditing={() => handleKeyDown(value)}
                  multiline={true}
                  blurOnSubmit={true}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="lotId"
            />
            <FormControl.ErrorMessage>
              {errors.lotId?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </Box>
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
              <Text>{form[item.prop]}</Text>
            </View>
          );
        })}
      </Box>
      <CardTable
        lotId={inputValue}
        trackStatus={trackStatus}
        handleSubmit={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
  lotIdText: {
    paddingRight: 8,
  },
  formItemLayout: {
    width: '50%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
export default TrackIn;
