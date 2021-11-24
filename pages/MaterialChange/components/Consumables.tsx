import {
  Box,
  Input,
  Text,
  Switch,
  Select,
  useToast,
  VStack,
  FormControl,
} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {ConsumablesProps} from '../index';
import {doUpdate} from '../../../services/materials';
import {getUserInfo} from '../../../utils/user';
import {ToastMessage} from '../../../utils/errorMessageMap';
import LoadingButton from '../../../components/LoadingButton';
type ConsumableType = {
  item: ConsumablesProps;
  stepId: string;
  lotId: string;
};

const Consumables: React.FC<ConsumableType> = ({
  item: {
    checked,
    consumablesType,
    consumablesBarCode,
    innerThread,
    bondingHead,
  },
  stepId,
  lotId,
}) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<ConsumablesProps>({
    defaultValues: {
      consumablesType,
      innerThread,
      bondingHead: bondingHead ? bondingHead : '',
      consumablesBarCode,
      checked: checked ? true : false,
    },
  });
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const toast = useToast();

  const onSubmit: SubmitHandler<ConsumablesProps> = async data => {
    const {eqpid} = await getUserInfo();
    const res = await doUpdate({
      cType: data.consumablesType,
      innerThread: data.innerThread,
      lotId: lotId!,
      stepId,
      eqpId: eqpid,
      barCode: data.consumablesBarCode,
      bondingHead: data.bondingHead,
      oldBarCode: consumablesBarCode,
      check: data.checked ? 1 : 0,
    });
    if (res.code === 1) {
      setIsUpdate(!isUpdate);
    }
    toast.show({
      title: ToastMessage(res),
    });
  };
  return (
    <Box
      bg="white"
      rounded="lg"
      width="100%"
      p={2}
      mt={2}
      flexDirection="row"
      flexWrap="wrap">
      <VStack width="50%" space={4} alignItems="center" mb={2} px={2}>
        <FormControl>
          <FormControl.Label>物料类型: </FormControl.Label>
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
            name="consumablesType"
          />
        </FormControl>
      </VStack>
      <VStack width="50%" space={4} alignItems="center" mb={2} px={2}>
        <FormControl>
          <FormControl.Label>内引线规格: </FormControl.Label>
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
            name="innerThread"
          />
        </FormControl>
      </VStack>
      <VStack width="50%" space={4} alignItems="center" mb={2} px={2}>
        <FormControl isRequired isInvalid={'consumablesBarCode' in errors}>
          <FormControl.Label>条码: </FormControl.Label>
          <Controller
            control={control}
            rules={{required: '请输入条码'}}
            render={({field: {onChange, value}}) => (
              <Input
                w="100%"
                value={value}
                onChangeText={onChange}
                isDisabled={isUpdate}
              />
            )}
            name="consumablesBarCode"
          />
          <FormControl.ErrorMessage>
            {errors.consumablesBarCode?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>
      <VStack width="50%" space={4} alignItems="center" mb={2} px={2}>
        <FormControl isRequired isInvalid={'bondingHead' in errors}>
          <FormControl.Label>键合头: </FormControl.Label>
          <Controller
            control={control}
            rules={{required: '请选择键合头'}}
            render={({field: {onChange, value}}) => (
              <Select
                w="100%"
                isDisabled={isUpdate}
                selectedValue={value.toString()}
                onValueChange={onChange}
                _selectedItem={{
                  bg: 'info.100',
                }}>
                <Select.Item label="1" value="1" />
                <Select.Item label="2" value="2" />
              </Select>
            )}
            name="bondingHead"
          />
          <FormControl.ErrorMessage>
            {errors.bondingHead?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>
      <View style={styles.formItem}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.formItemLayout}>
              <Text w={'30%'} pl={2} textAlign="left">
                是否勾选:{' '}
              </Text>
              <View style={styles.checkedView}>
                <Switch
                  onToggle={(val: boolean) => onChange(val)}
                  isChecked={value}
                  isDisabled={isUpdate}
                />
              </View>
            </View>
          )}
          name="checked"
        />
      </View>
      <View style={styles.submitBtn}>
        <LoadingButton
          title={isUpdate ? '已确认' : '确认新增'}
          onPress={handleSubmit(onSubmit)}
          size="sm"
          isDisabled={isUpdate}
          colorScheme={'blue'}
        />
      </View>
    </Box>
  );
};
const styles = StyleSheet.create({
  formItem: {
    width: '50%',
  },
  formItemLayout: {
    // height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkedView: {
    width: '70%',
    alignItems: 'flex-start',
  },
  submitBtn: {
    // height: 40,
  },
});
export default Consumables;
