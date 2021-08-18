import {Box, Input, Text, Button, Select, Switch} from 'native-base';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';

interface IFormProps {
  type: string;
  spe: string;
  code: string;
  head: string;
  isChecked: boolean;
}

const Consumables: React.FC = () => {
  const {handleSubmit, control} = useForm<IFormProps>();
  const onSubmit: SubmitHandler<IFormProps> = data => {
    console.log(data);
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
              <Select
                w="70%"
                selectedValue={value}
                onValueChange={(itemValue: string) => {
                  onChange(itemValue);
                }}>
                <Select.Item label="JavaScript" value="js" />
                <Select.Item label="TypeScript" value="ts" />
                <Select.Item label="Java" value="java" />
              </Select>
            </View>
          )}
          name="type"
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
              <Input w="70%" value={value} onChangeText={onChange} />
            </View>
          )}
          name="spe"
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
          name="code"
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
          name="head"
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
          name="isChecked"
        />
      </View>
      <View style={styles.submitBtn}>
        <Button onPress={handleSubmit(onSubmit)} size="sm">
          确认新增
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
