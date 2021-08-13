import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Box, Text, Input, Button, Select, TextArea} from 'native-base';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
interface OEEForm {
  type: string;
  number: string;
  eqpstatus: string;
  status: string;
  code: string;
  user: string;
  remark: string;
}
const ChangeOEE: React.FC = () => {
  const {handleSubmit, control} = useForm<OEEForm>();

  const onSubmit: SubmitHandler<OEEForm> = data => {
    console.log(data);
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
                  设备类型:{' '}
                </Text>
                <Input w="70%" value={value} onChangeText={onChange} />
              </View>
            )}
            name="type"
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
                <Input w="70%" value={value} onChangeText={onChange} />
              </View>
            )}
            name="number"
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
                <Input w="70%" value={value} onChangeText={onChange} />
              </View>
            )}
            name="eqpstatus"
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
                  }}>
                  <Select.Item label="JavaScript" value="js" />
                  <Select.Item label="TypeScript" value="ts" />
                  <Select.Item label="Java" value="java" />
                </Select>
              </View>
            )}
            name="status"
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
                  <Select.Item label="JavaScript" value="js" />
                  <Select.Item label="TypeScript" value="ts" />
                  <Select.Item label="Java" value="java" />
                </Select>
              </View>
            )}
            name="code"
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
                <Input w="70%" value={value} onChangeText={onChange} />
              </View>
            )}
            name="user"
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
export default ChangeOEE;
