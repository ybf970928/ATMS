import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Box, Input, useToast, VStack, FormControl} from 'native-base';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {getEqpId} from '../../utils/user';
import {getLotInfo} from '../../services/public';
import {doUpdate} from '../../services/handOver';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {ToastMessage} from '../../utils/errorMessageMap';
import {AuthContext} from '../../layouts/AuthProvider';
import LoadingButton from '../../components/LoadingButton';

interface HandOverForm {
  lotId: string;
  eqpId: string;
  userId: string;
  quotaCode: string;
  deviceQty: string;
  qty: string;
}

const Handover: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm<HandOverForm>();
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  const toast = useToast();
  const onSubmit: SubmitHandler<HandOverForm> = async data => {
    if (Number(data.qty) > Number(data.deviceQty)) {
      toast.show({
        title: '实物数量不能大于系统数量',
      });
      return;
    }

    try {
      const res = await doUpdate({
        eqpId: data.eqpId,
        lotId: data.lotId,
        qty: data.qty,
      });
      if (res.code === 1) {
        logout();
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Home',
          }),
        );
      }
      toast.show({
        title: ToastMessage(res),
      });
    } catch (error) {
      toast.show({
        title: '系统未知异常',
      });
    }
  };

  const gethandeOverForm = async (id: string) => {
    const eqpId = await getEqpId();
    const res = await getLotInfo({
      eqpId: eqpId,
      lotId: id,
    });
    const {quotaCode, deviceQty, ...obj} = res.data;
    setValue('userId', obj.operId);
    setValue('eqpId', res.data.eqpId);
    setValue('quotaCode', quotaCode);
    setValue('deviceQty', deviceQty);
  };

  return (
    <View style={styles.layout}>
      <Box
        bg="white"
        rounded="lg"
        width="100%"
        marginTop={5}
        p={2}
        flexDirection="row"
        flexWrap="wrap">
        <VStack width="100%" space={4} alignItems="center" mb={2}>
          <FormControl isRequired isInvalid={'lotId' in errors}>
            <FormControl.Label>作业批号: </FormControl.Label>
            <Controller
              control={control}
              rules={{required: '请输入作业批号'}}
              render={({field: {onChange, value}}) => (
                <Input
                  w={'100%'}
                  onSubmitEditing={() => gethandeOverForm(value)}
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
        <VStack width="100%" space={4} alignItems="center" mb={2}>
          <FormControl>
            <FormControl.Label>机台号: </FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  w="100%"
                  value={value}
                  onChangeText={onChange}
                  isDisabled
                />
              )}
              name="eqpId"
            />
          </FormControl>
        </VStack>
        <VStack width="100%" space={4} alignItems="center" mb={2}>
          <FormControl>
            <FormControl.Label>作业员: </FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  w="100%"
                  value={value}
                  onChangeText={onChange}
                  isDisabled
                />
              )}
              name="userId"
            />
          </FormControl>
        </VStack>
        <VStack width="100%" space={4} alignItems="center" mb={2}>
          <FormControl>
            <FormControl.Label>定额代码: </FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  w="100%"
                  value={value}
                  onChangeText={onChange}
                  isDisabled
                />
              )}
              name="quotaCode"
            />
          </FormControl>
        </VStack>
        <VStack width="100%" space={4} alignItems="center" mb={2}>
          <FormControl>
            <FormControl.Label>系统数量: </FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  w="100%"
                  value={value}
                  onChangeText={onChange}
                  isDisabled
                />
              )}
              name="deviceQty"
            />
          </FormControl>
        </VStack>
        <VStack width="100%" space={4} alignItems="center" mb={2}>
          <FormControl isRequired isInvalid={'qty' in errors}>
            <FormControl.Label>实物数量: </FormControl.Label>
            <Controller
              control={control}
              rules={{required: '请输入实物数量'}}
              render={({field: {onChange, value}}) => (
                <Input
                  w="100%"
                  value={value}
                  onChangeText={text => {
                    const val = text.replace(/[^0-9]/g, '');
                    onChange(val);
                  }}
                  keyboardType="number-pad"
                />
              )}
              name="qty"
            />
            <FormControl.ErrorMessage>
              {errors.qty?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </Box>
      <Box bg="white" rounded="lg" width="100%" marginTop={5}>
        <LoadingButton title="确认交接" onPress={handleSubmit(onSubmit)} />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 10,
  },
});
export default Handover;
