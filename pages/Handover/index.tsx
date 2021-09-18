import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Box, Text, Input, Button, useToast} from 'native-base';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {getUserInfo} from '../../utils/user';
import {getLotInfo} from '../../services/public';
import {doUpdate} from '../../services/handOver';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {ToastMessage} from '../../utils/errorMessageMap';
import {AuthContext} from '../../layouts/AuthProvider';
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
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.formItemLayout}>
                <Text w={'30%'} pl={2} textAlign="left">
                  作业批号:{' '}
                </Text>
                <Input
                  w={'70%'}
                  onSubmitEditing={() => gethandeOverForm(value)}
                  multiline={true}
                  blurOnSubmit={true}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
            name="lotId"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.formItemLayout}>
                <Text w={'30%'} pl={2} textAlign="left">
                  机台号:{' '}
                </Text>
                <Input
                  w="70%"
                  value={value}
                  onChangeText={onChange}
                  isDisabled
                />
              </View>
            )}
            name="eqpId"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.formItemLayout}>
                <Text w={'30%'} pl={2} textAlign="left">
                  作业员:{' '}
                </Text>
                <Input
                  w="70%"
                  value={value}
                  onChangeText={onChange}
                  isDisabled
                />
              </View>
            )}
            name="userId"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.formItemLayout}>
                <Text w={'30%'} pl={2} textAlign="left">
                  定额代码:{' '}
                </Text>
                <Input
                  w="70%"
                  value={value}
                  onChangeText={onChange}
                  isDisabled
                />
              </View>
            )}
            name="quotaCode"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.formItemLayout}>
                <Text w={'30%'} pl={2} textAlign="left">
                  系统数量:{' '}
                </Text>
                <Input
                  w="70%"
                  value={value}
                  onChangeText={onChange}
                  isDisabled
                />
              </View>
            )}
            name="deviceQty"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.formItemLayout}>
                <Text w={'30%'} pl={2} textAlign="left">
                  实物数量:{' '}
                </Text>
                <Input
                  w="70%"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                />
              </View>
            )}
            name="qty"
          />
        </View>
      </Box>
      <Box bg="white" rounded="lg" width="100%" marginTop={5}>
        <Button onPress={handleSubmit(onSubmit)}>确认交接</Button>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 10,
  },
  // formItem: {
  //   width: '50%',
  // },
  formItemLayout: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
export default Handover;
