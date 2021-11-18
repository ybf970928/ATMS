import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Box, Input, useToast, VStack, FormControl} from 'native-base';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {getUserInfo} from '../../utils/user';
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
  const {handleSubmit, control, setValue} = useForm<HandOverForm>();
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  const toast = useToast();
  const onSubmit: SubmitHandler<HandOverForm> = async data => {
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
    } catch (error) {}
  };

  const gethandeOverForm = async (id: string) => {
    const {eqpid, user} = await getUserInfo();
    const res = await getLotInfo({
      eqpId: eqpid,
      lotId: id,
    });
    const {quotaCode, deviceQty} = res.data;
    setValue('userId', user.userID);
    setValue('eqpId', eqpid);
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
          <FormControl>
            <FormControl.Label>作业批号: </FormControl.Label>
            <Controller
              control={control}
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
          <FormControl>
            <FormControl.Label>实物数量: </FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  w="100%"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                />
              )}
              name="qty"
            />
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
