import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Box,
  Text,
  Input,
  Button,
  Select,
  TextArea,
  useToast,
} from 'native-base';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {
  getOEEStatusSwitch,
  getOEEReason,
  doUpdate,
} from '../../services/OEESwitch';
import {getUserInfo} from '../../utils/user';
export interface OEEForm {
  eqpType: string;
  eqpId: string;
  eqpStatus: string;
  operId: string;
  reasonCode: string;
  eqpSwitchStatus: string;
  remark: string;
}
import {ToastMessage} from '../../utils/errorMessageMap';

const ChangeOEE: React.FC = () => {
  const toast = useToast();
  const [statusSelectList, setStatusSelectList] = useState<
    {id: string; name: string}[]
  >([]);
  const [reasonCodeSelectList, setReasonCodeSelectList] = useState<
    {id: string; name: string}[]
  >([]);
  const {handleSubmit, control, setValue} = useForm<OEEForm>();

  useEffect(() => {
    const init = async () => {
      const {eqpid} = await getUserInfo();
      const res = await getOEEStatusSwitch({eqpId: eqpid});
      const {statusList, ...obj} = res.data;
      for (const [key, value] of Object.entries(obj)) {
        setValue(key as keyof OEEForm, value as string);
      }
      setStatusSelectList(statusList);
    };
    init();
  }, [setValue]);

  const getReasonCodeList = async (value: string) => {
    const res = await getOEEReason({statusCode: value});
    setReasonCodeSelectList(res.data);
  };

  const onSubmit: SubmitHandler<OEEForm> = async data => {
    const res = await doUpdate(data);
    toast.show({
      title: ToastMessage(res),
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1!}}>
      <ScrollView style={styles.layout}>
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
                    设备类型:{' '}
                  </Text>
                  <Input
                    w="70%"
                    value={value}
                    onChangeText={onChange}
                    isDisabled
                  />
                </View>
              )}
              name="eqpType"
            />
          </View>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={styles.formItemLayout}>
                  <Text w={'30%'} pl={2} textAlign="left">
                    设备编号:{' '}
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
                    机台状态:{' '}
                  </Text>
                  <Input
                    w="70%"
                    value={value}
                    onChangeText={onChange}
                    isDisabled
                  />
                </View>
              )}
              name="eqpStatus"
            />
          </View>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={styles.formItemLayout}>
                  <Text w={'30%'} pl={2} textAlign="left">
                    状态:{' '}
                  </Text>
                  <Select
                    w="70%"
                    selectedValue={value}
                    onValueChange={(itemValue: string) => {
                      onChange(itemValue);
                      getReasonCodeList(itemValue);
                    }}>
                    {statusSelectList.map(item => (
                      <Select.Item
                        label={item.name}
                        value={item.id}
                        key={item.id}
                      />
                    ))}
                  </Select>
                </View>
              )}
              name="eqpSwitchStatus"
            />
          </View>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={styles.formItemLayout}>
                  <Text w={'30%'} pl={2} textAlign="left">
                    原因代码:{' '}
                  </Text>
                  <Select
                    w="70%"
                    selectedValue={value}
                    onValueChange={(itemValue: string) => {
                      onChange(itemValue);
                    }}>
                    {reasonCodeSelectList.map(item => (
                      <Select.Item
                        label={item.name}
                        value={item.id}
                        key={item.id}
                      />
                    ))}
                  </Select>
                </View>
              )}
              name="reasonCode"
            />
          </View>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={styles.formItemLayout}>
                  <Text w={'30%'} pl={2} textAlign="left">
                    操作员:{' '}
                  </Text>
                  <Input
                    w="70%"
                    value={value}
                    onChangeText={onChange}
                    isDisabled
                  />
                </View>
              )}
              name="operId"
            />
          </View>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={styles.formItemLayout}>
                  <Text w={'30%'} pl={2} textAlign="left">
                    备注:{' '}
                  </Text>
                  <TextArea w="70%" value={value} onChangeText={onChange} />
                </View>
              )}
              name="remark"
            />
          </View>
        </Box>
        <Box bg="white" rounded="lg" width="100%" marginTop={5}>
          <Button onPress={handleSubmit(onSubmit)}>确认</Button>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
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
export default ChangeOEE;
