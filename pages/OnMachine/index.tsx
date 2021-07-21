import React, {useEffect} from 'react';
import {
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Select,
  CheckIcon,
  ScrollView,
} from 'native-base';
import {IconOutline} from '@ant-design/icons-react-native';
import {navigate} from '../../utils/RootNavigation';
import {useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';

// 字段到时候再具体定义
interface FormProps {
  handleId?: string;
  biandai?: string;
  wuliao?: string;
  suigong?: string;
  wuliaoCode?: string;
}

const OnMachineStack: React.FC = ({children}) => {
  return (
    <Stack
      mx={6}
      p={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      {children}
    </Stack>
  );
};

const OnMachine: React.FC = () => {
  const [formValue, setFormValue] = useState<FormProps>({});
  const isFocused = useIsFocused();
  const route = useRoute<any>();
  useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setFormValue({
          ...formValue,
          ...route.params,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, route.params]);

  const doSave = () => {
    console.log(formValue);
  };

  return (
    <ScrollView
      flex={1}
      _contentContainerStyle={{
        alignItems: 'center'!,
      }}>
      <Box bg="white" rounded="lg" width="90%" marginTop={5}>
        <FormControl>
          <OnMachineStack>
            <FormControl.Label w={'30%'}>机台编号: </FormControl.Label>
            <Input
              style={{height: 40!}}
              w={'70%'}
              placeholder="扫描或者输入机台编号"
              size="xs"
              value={formValue.handleId}
              onChangeText={(value: string) =>
                setFormValue({...formValue, handleId: value})
              }
              InputRightElement={
                <IconOutline
                  size={20}
                  name="scan"
                  style={{padding: 10!}}
                  onPress={() =>
                    navigate('ScanQRCode', {
                      formRoute: 'OnMachine',
                      Keyword: 'handleId',
                    })
                  }
                />
              }
            />
          </OnMachineStack>
          <OnMachineStack>
            <FormControl.Label w={'30%'}>编带站: </FormControl.Label>
            <Select
              w={'70%'}
              style={{height: 40!}}
              size="xs"
              selectedValue={formValue.biandai}
              placeholder="请选择编带站"
              onValueChange={value =>
                setFormValue({...formValue, biandai: value})
              }
              _selectedItem={{
                bg: 'cyan.600',
                endIcon: <CheckIcon size={4} />,
              }}>
              <Select.Item label="JavaScript" value="js" />
              <Select.Item label="TypeScript" value="ts" />
              <Select.Item label="C" value="c" />
              <Select.Item label="Python" value="py" />
              <Select.Item label="Java" value="java" />
            </Select>
          </OnMachineStack>
          <OnMachineStack>
            <FormControl.Label w={'30%'}>物料类型: </FormControl.Label>
            <Select
              w={'70%'}
              style={{height: 40!}}
              size="xs"
              selectedValue={formValue.wuliao}
              placeholder="请选择物料类型"
              onValueChange={value =>
                setFormValue({...formValue, wuliao: value})
              }
              _selectedItem={{
                bg: 'cyan.600',
                endIcon: <CheckIcon size={4} />,
              }}>
              <Select.Item label="JavaScript2" value="js" />
              <Select.Item label="TypeScript2" value="ts" />
              <Select.Item label="C2" value="c" />
              <Select.Item label="Python2" value="py" />
              <Select.Item label="Java2" value="java" />
            </Select>
          </OnMachineStack>
          <OnMachineStack>
            <FormControl.Label w={'30%'}>随工单编号: </FormControl.Label>
            <Input
              style={{height: 40!}}
              w={'70%'}
              placeholder="扫描或者输入测试随工单号"
              size="xs"
              value={formValue.suigong}
              onChangeText={(value: string) =>
                setFormValue({...formValue, suigong: value})
              }
              InputRightElement={
                <IconOutline
                  size={20}
                  name="scan"
                  style={{padding: 10!}}
                  onPress={() =>
                    navigate('ScanQRCode', {
                      formRoute: 'OnMachine',
                      Keyword: 'suigong',
                    })
                  }
                />
              }
            />
          </OnMachineStack>
          <OnMachineStack>
            <FormControl.Label w={'30%'}>物料编码: </FormControl.Label>
            <Input
              style={{height: 40!}}
              w={'70%'}
              placeholder="扫描或者输入物料编码"
              size="xs"
              value={formValue.wuliaoCode}
              onChangeText={(value: string) =>
                setFormValue({...formValue, wuliaoCode: value})
              }
              InputRightElement={
                <IconOutline
                  size={20}
                  name="scan"
                  style={{padding: 10!}}
                  onPress={() =>
                    navigate('ScanQRCode', {
                      formRoute: 'OnMachine',
                      Keyword: 'wuliaoCode',
                    })
                  }
                />
              }
            />
          </OnMachineStack>
        </FormControl>
        <Stack mx={6} p={2} alignItems="center">
          <Button onPress={doSave} w={200} marginTop={10}>
            确认
          </Button>
        </Stack>
      </Box>
    </ScrollView>
  );
};

export default OnMachine;
