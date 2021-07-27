import {useFocusEffect, useRoute} from '@react-navigation/native';
import {Box, Button, FormControl, Input, ScrollView, Text} from 'native-base';
import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScanCodeInput} from '../../components/ScanCodeInput';
import {OnMachineStack} from '../../components/StackBW';

interface FormProps {
  handleId: string;
  xinghao: string;
  wuliao: string;
  suigong: string;
  testerId: string;
  pihao: string;
  mingcheng: string;
  gongdan: string;
  chengxu: string;
  dangban: string;
  mima: string;
  jieban: string;
  mima2: string;
}
const formItem: {label: string; prop: keyof FormProps}[] = [
  {label: '测试机', prop: 'testerId'},
  {label: '随工单', prop: 'suigong'},
  {label: '产品型号', prop: 'xinghao'},
  {label: '客户批号', prop: 'pihao'},
  {label: '客户名称', prop: 'mingcheng'},
  {label: '工单号', prop: 'gongdan'},
  {label: '测试程序', prop: 'chengxu'},
];

const Handover: React.FC = () => {
  const {setValue, handleSubmit, control} = useForm<FormProps>({});
  const route = useRoute<any>();

  useFocusEffect(
    useCallback(() => {
      if (route.params) {
        Object.keys(route.params).forEach((key: any) => {
          setValue(key, route.params[key]);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.params]),
  );
  const onSubmit = (data: FormProps) => console.log(data);
  return (
    <ScrollView
      flex={1}
      _contentContainerStyle={{
        alignItems: 'center'!,
      }}>
      <Box bg="white" rounded="lg" width="90%" marginTop={5}>
        <FormControl>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <ScanCodeInput
                w={'70%'}
                onChangeText={onChange}
                value={value}
                label="分选机:"
                prop="handleId"
                fromRoute="Handover">
                <FormControl.Label w={'30%'}>分选机: </FormControl.Label>
              </ScanCodeInput>
            )}
            name="handleId"
          />
          {formItem.map((item, index) => {
            return (
              <Controller
                key={index}
                control={control}
                render={({field: {value}}) => (
                  <OnMachineStack>
                    <FormControl.Label w={'30%'}>
                      {item.label}:
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
      <Box
        bg="white"
        rounded="lg"
        width="90%"
        marginTop={5}
        marginBottom={5}
        p={2}>
        <FormControl>
          <Controller
            control={control}
            render={({field: {value}}) => (
              <OnMachineStack>
                <FormControl.Label w={'30%'}>当班人员:</FormControl.Label>
                <Text w="70%">{value}</Text>
              </OnMachineStack>
            )}
            name="dangban"
          />
          <Controller
            control={control}
            render={({field: {value, onChange}}) => (
              <OnMachineStack>
                <FormControl.Label w={'30%'}>密码:</FormControl.Label>
                <Input
                  w={'70%'}
                  p={1}
                  value={value}
                  onChangeText={onChange}
                  type="password"
                />
              </OnMachineStack>
            )}
            name="mima"
          />
          <Controller
            control={control}
            render={({field: {value, onChange}}) => (
              <OnMachineStack>
                <FormControl.Label w={'30%'}>接班人员:</FormControl.Label>
                <Input w={'70%'} p={1} value={value} onChangeText={onChange} />
              </OnMachineStack>
            )}
            name="jieban"
          />
          <Controller
            control={control}
            render={({field: {value, onChange}}) => (
              <OnMachineStack>
                <FormControl.Label w={'30%'}>密码:</FormControl.Label>
                <Input
                  w={'70%'}
                  p={1}
                  value={value}
                  onChangeText={onChange}
                  type="password"
                />
              </OnMachineStack>
            )}
            name="mima2"
          />
        </FormControl>
        <Button onPress={handleSubmit(onSubmit)} w={200} mx="auto">
          确认
        </Button>
      </Box>
    </ScrollView>
  );
};

export default Handover;
