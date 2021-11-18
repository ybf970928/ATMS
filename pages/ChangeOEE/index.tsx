import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {
  Box,
  Input,
  Select,
  TextArea,
  Text,
  useToast,
  FormControl,
  VStack,
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
import LoadingButton from '../../components/LoadingButton';

const ChangeOEE: React.FC = () => {
  const toast = useToast();
  const [statusSelectList, setStatusSelectList] = useState<
    {id: string; name: string}[]
  >([]);
  const [reasonCodeSelectList, setReasonCodeSelectList] = useState<
    {id: string; name: string}[]
  >([]);
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm<OEEForm>();

  useEffect(() => {
    const init = async () => {
      try {
        const {eqpid} = await getUserInfo();
        const res = await getOEEStatusSwitch({eqpId: eqpid});
        const {statusList, ...obj} = res.data;
        setStatusSelectList(statusList || []);
        for (const [key, value] of Object.entries(obj)) {
          setValue(key as keyof OEEForm, value as string);
        }
      } catch (error) {}
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
          <VStack width="100%" space={4} alignItems="center" mb={2}>
            <FormControl>
              <FormControl.Label>设备类型: </FormControl.Label>
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
                name="eqpType"
              />
            </FormControl>
          </VStack>
          <VStack width="100%" space={4} alignItems="center" mb={2}>
            <FormControl>
              <FormControl.Label>设备编号: </FormControl.Label>
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
              <FormControl.Label>机台状态: </FormControl.Label>
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
                name="eqpStatus"
              />
            </FormControl>
          </VStack>
          <VStack width="100%" space={4} alignItems="center" mb={2}>
            <FormControl isRequired isInvalid={'eqpSwitchStatus' in errors}>
              <FormControl.Label>状态: </FormControl.Label>
              <Controller
                control={control}
                rules={{required: '请选择状态'}}
                render={({field: {onChange, value}}) => (
                  <Select
                    w="100%"
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
                )}
                name="eqpSwitchStatus"
              />
              <FormControl.ErrorMessage>
                {errors.eqpSwitchStatus?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <VStack width="100%" space={4} alignItems="center" mb={2}>
            <FormControl isRequired isInvalid={'reasonCode' in errors}>
              <FormControl.Label>原因代码: </FormControl.Label>
              <Controller
                control={control}
                rules={{required: '请选择原因代码'}}
                render={({field: {onChange, value}}) => (
                  <Select
                    w="100%"
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
                )}
                name="reasonCode"
              />
              <FormControl.ErrorMessage>
                {errors.reasonCode?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <VStack width="100%" space={4} alignItems="center" mb={2}>
            <FormControl>
              <FormControl.Label>操作员: </FormControl.Label>
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
                name="operId"
              />
            </FormControl>
          </VStack>
          <VStack width="100%" space={4} alignItems="center">
            <FormControl isInvalid={'remark' in errors}>
              <FormControl.Label>备注: </FormControl.Label>
              <Controller
                control={control}
                rules={{maxLength: 200}}
                render={({field: {onChange, value}}) => (
                  <TextArea
                    w="100%"
                    value={value}
                    onChangeText={onChange}
                    InputRightElement={
                      <View style={styles.textArea}>
                        <Text color="muted.300">{`${
                          value ? value.length : 0
                        }/200`}</Text>
                      </View>
                    }
                  />
                )}
                name="remark"
              />
            </FormControl>
          </VStack>
        </Box>
        <Box
          bg="white"
          rounded="lg"
          width="100%"
          marginTop={5}
          marginBottom={5}>
          <LoadingButton title="确认" onPress={handleSubmit(onSubmit)} />
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
  textArea: {
    height: '100%',
    paddingRight: 16,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
export default ChangeOEE;
