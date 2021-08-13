import {Box, Input, Text, Button} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Controller, useForm, SubmitHandler, Control} from 'react-hook-form';

interface FormProps {
  batchNumber: string;
  eqpId: string;
  user: string;
  code: string;
  systemNum: string;
  eqpNum: string;
}

interface FormItemValue {
  label: string;
  name: keyof FormProps;
}

const FormItem = ({
  control,
  item,
}: {
  control: Control<FormProps>;
  item: FormItemValue;
}) => {
  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <View style={styles.formItemLayout}>
            <Text w={'30%'} pl={2} textAlign="left">
              {item.label}:{' '}
            </Text>
            <Input w="70%" value={value} onChangeText={onChange} />
          </View>
        )}
        name={item.name}
      />
    </View>
  );
};

const Handover: React.FC = () => {
  const {handleSubmit, control} = useForm<FormProps>({});
  const Forms: FormItemValue[] = [
    {label: '作业批号', name: 'batchNumber'},
    {label: '机台号', name: 'eqpId'},
    {label: '作业员', name: 'user'},
    {label: '定额代码', name: 'code'},
    {label: '系统数量', name: 'systemNum'},
    {label: '实物数量', name: 'eqpNum'},
  ];
  const onSubmit: SubmitHandler<FormProps> = data => console.log(data);
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
        {Forms.map((item, index) => {
          return <FormItem control={control} item={item} key={index} />;
        })}
      </Box>
      <Button onPress={handleSubmit(onSubmit)} mt={10}>
        确认交接
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 10,
  },
  formItemLayout: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Handover;
