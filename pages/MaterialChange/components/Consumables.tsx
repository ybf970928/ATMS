import {Box, Input, Text, Button, Switch} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {ConsumablesProps} from '../index';
import {doUpdate} from '../../../services/materials';
type ConsumableType = {
  item: ConsumablesProps;
};

const Consumables: React.FC<ConsumableType> = ({
  item: {
    checked,
    consumablesType,
    consumablesBarCode,
    innerThread,
    bondingHead,
  },
}) => {
  const {handleSubmit, control} = useForm<ConsumablesProps>({
    defaultValues: {
      consumablesType,
      innerThread,
      bondingHead,
      consumablesBarCode,
      checked: checked ? true : false,
    },
  });
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const onSubmit: SubmitHandler<ConsumablesProps> = data => {
    doUpdate({
      cType: data.consumablesType,
      innerThread: data.innerThread,
      barCode: data.consumablesBarCode,
      bondingHead: data.bondingHead,
      oldBarCode: consumablesBarCode,
      check: data.checked ? 1 : 0,
    }).then(res => {
      if (res.code === 1) {
        setIsUpdate(!isUpdate);
      }
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
      <View style={styles.formItem}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.formItemLayout}>
              <Text w={'30%'} pl={2} textAlign="left">
                材料类型:{' '}
              </Text>
              <Input w="70%" value={value} onChangeText={onChange} isReadOnly />
            </View>
          )}
          name="consumablesType"
        />
      </View>
      <View style={styles.formItem}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.formItemLayout}>
              <Text minW={'30%'} pl={2} textAlign="left">
                内引线规格:{' '}
              </Text>
              <Input w="70%" value={value} onChangeText={onChange} isReadOnly />
            </View>
          )}
          name="innerThread"
        />
      </View>
      <View style={styles.formItem}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.formItemLayout}>
              <Text w={'30%'} pl={2} textAlign="left">
                条码:{' '}
              </Text>
              <Input w="70%" value={value} onChangeText={onChange} />
            </View>
          )}
          name="consumablesBarCode"
        />
      </View>
      <View style={styles.formItem}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.formItemLayout}>
              <Text w={'30%'} pl={2} textAlign="left">
                键合头:{' '}
              </Text>
              <Input w="70%" value={value} onChangeText={onChange} />
            </View>
          )}
          name="bondingHead"
        />
      </View>
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
                />
              </View>
            </View>
          )}
          name="checked"
        />
      </View>
      <View style={styles.submitBtn}>
        <Button
          onPress={handleSubmit(onSubmit)}
          size="sm"
          isDisabled={isUpdate}
          colorScheme={isUpdate ? 'green' : 'blue'}>
          {isUpdate ? '已确认' : '确认新增'}
        </Button>
      </View>
    </Box>
  );
};
const styles = StyleSheet.create({
  formItem: {
    width: '50%',
  },
  formItemLayout: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkedView: {
    width: '70%',
    alignItems: 'flex-start',
  },
  submitBtn: {
    height: 40,
  },
});
export default Consumables;
