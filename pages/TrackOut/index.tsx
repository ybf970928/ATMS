import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {OnMachineStack} from '../../components/StackBW';
import {Box, FormControl, Text, Input, Switch, Heading} from 'native-base';
import {ScanCodeInput} from '../../components/ScanCodeInput';

interface FormProps {
  handleId: string;
  testerId: string;
  rememberMe: boolean;
}

const TableColumn: {label: string; prop: keyof FormProps}[] = [
  {label: '测试机编号: ', prop: 'testerId'},
  {label: '随工单号: ', prop: 'testerId'},
  {label: '测试步骤: ', prop: 'testerId'},
  {label: '生产流程: ', prop: 'testerId'},
  {label: '产品型号: ', prop: 'testerId'},
  {label: '封装形式: ', prop: 'testerId'},
  {label: '程序名称: ', prop: 'testerId'},
  {label: '客户批号: ', prop: 'testerId'},
  {label: '客户名称: ', prop: 'testerId'},
  {label: '封装工单号: ', prop: 'testerId'},
];
const TrackOut: React.FC = () => {
  const {setValue, handleSubmit, control} = useForm<FormProps>({
    defaultValues: {
      rememberMe: false,
    },
  });
  return (
    <ScrollView style={styles.scrollView}>
      <Box bg="white" maxWidth="100%" marginBottom={5} rounded="lg">
        <Heading size="md" fontSize="md" pl={8} pt={2}>
          基础信息
        </Heading>
        <FormControl>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <ScanCodeInput
                w={'70%'}
                onChangeText={onChange}
                value={value}
                label="分选机编号:"
                prop="jitai"
                fromRoute="TrackOut">
                <FormControl.Label w={'30%'}>分选机编号: </FormControl.Label>
              </ScanCodeInput>
            )}
            name="handleId"
          />
          {TableColumn.map((item, index) => {
            return (
              <Controller
                key={index}
                control={control}
                render={({field: {value}}) => (
                  <OnMachineStack>
                    <FormControl.Label w={'30%'}>
                      {item.label}
                    </FormControl.Label>
                    <Text w="70%">{value}</Text>
                  </OnMachineStack>
                )}
                name={item.prop}
              />
            );
          })}
        </FormControl>
      </Box>
      <Box bg="white" maxWidth="100%" marginBottom={5} rounded="lg">
        <FormControl>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <OnMachineStack>
                <FormControl.Label w={'30%'}>备注: </FormControl.Label>
                <Input
                  p={1}
                  w={'70%'}
                  onChangeText={val => onChange(val)}
                  value={value}
                />
              </OnMachineStack>
            )}
            name="testerId"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <OnMachineStack>
                <FormControl.Label w={'30%'}>是否中断: </FormControl.Label>
                <Switch
                  onToggle={(val: boolean) => onChange(val)}
                  isChecked={value}
                  onTrackColor="blue.500"
                />
              </OnMachineStack>
            )}
            name="rememberMe"
          />
        </FormControl>
      </Box>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
  },
});
export default TrackOut;
