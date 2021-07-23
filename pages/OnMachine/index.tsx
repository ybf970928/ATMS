import {useForm, Controller} from 'react-hook-form';
import React, {useEffect} from 'react';
import {Box, FormControl, ScrollView, Button, TextArea} from 'native-base';
import {ScanCodeInput} from '../../components/ScanCodeInput';
import {FormSelect} from '../../components';
import {OnMachineStack} from '../../components/StackBW';
import {useIsFocused, useRoute} from '@react-navigation/native';
type FormData = {
  jitai: string;
  biandai: string;
  wuliao: string;
  suigong: string;
  wuliao2: string;
};

const OnMachine: React.FC = () => {
  const {setValue, handleSubmit, control} = useForm<FormData>();
  const isFocused = useIsFocused();
  const route = useRoute<any>();
  useEffect(() => {
    if (isFocused && route.params) {
      Object.keys(route.params).forEach((key: any) => {
        setValue(key, route.params[key]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, route.params]);
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
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
                label="机台编号:"
                prop="jitai"
                fromRoute="OnMachine">
                <FormControl.Label w={'30%'}>机台编号: </FormControl.Label>
              </ScanCodeInput>
            )}
            name="jitai"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FormSelect
                w={'70%'}
                value={value}
                onValueChange={onChange}
                label="编带站"
                option={[
                  {id: 'js', name: 'JavaScript'},
                  {id: 'ts', name: 'TypeScript'},
                  {id: 'java', name: 'Java'},
                ]}>
                <FormControl.Label w={'30%'}>编带站: </FormControl.Label>
              </FormSelect>
            )}
            name="biandai"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FormSelect
                w={'70%'}
                value={value}
                onValueChange={onChange}
                label="物料类型"
                option={[
                  {id: 'js', name: 'JavaScript'},
                  {id: 'ts', name: 'TypeScript'},
                  {id: 'java', name: 'Java'},
                ]}>
                <FormControl.Label w={'30%'}>物料类型: </FormControl.Label>
              </FormSelect>
            )}
            name="wuliao"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <ScanCodeInput
                w={'70%'}
                onChangeText={onChange}
                value={value}
                label="随工单编号:"
                prop="suigong"
                fromRoute="OnMachine">
                <FormControl.Label w={'30%'}>随工单编号: </FormControl.Label>
              </ScanCodeInput>
            )}
            name="suigong"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <OnMachineStack>
                <FormControl.Label w={'30%'}>物料编码: </FormControl.Label>
                <TextArea
                  w={'70%'}
                  onChangeText={val => onChange(val)}
                  value={value}
                  placeholder="请输入物料编码"
                />
              </OnMachineStack>
            )}
            name="wuliao2"
          />
        </FormControl>
        <Button
          onPress={handleSubmit(onSubmit)}
          w={200}
          mx="auto"
          marginBottom={5}
          marginTop={5}>
          确认
        </Button>
      </Box>
    </ScrollView>
  );
};

export default OnMachine;
