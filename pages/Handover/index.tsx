import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Box, Text, Input, Button} from 'native-base';
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
const Handover: React.FC = () => {
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
                  作业批号:{' '}
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
                  机台号:{' '}
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
                  作业员:{' '}
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
                  定额代码:{' '}
                </Text>
                <Input w="70%" value={value} onChangeText={onChange} />
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
                  系统数量:{' '}
                </Text>
                <Input w="70%" value={value} onChangeText={onChange} />
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
                  实物数量:{' '}
                </Text>
                <Input w="70%" value={value} onChangeText={onChange} />
              </View>
            )}
            name="user"
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
