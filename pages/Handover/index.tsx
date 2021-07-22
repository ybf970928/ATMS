import React, {useEffect} from 'react';
import {Box, FormControl, Text, Stack, ScrollView} from 'native-base';
import {useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import HandoverAlert from './components/HandoverAlert';
import Personnel from './components/Personnel';
interface FormProps {
  handleId?: string;
  xinghao?: string;
  wuliao?: string;
  suigong?: string;
  testerId?: string;
  pihao?: string;
  mingcheng?: string;
  gongdan?: string;
  chengxu?: string;
}
const formItem: {title: string; prop: keyof FormProps}[] = [
  {title: '分选机', prop: 'handleId'},
  {title: '测试机', prop: 'testerId'},
  {title: '随工单', prop: 'suigong'},
  {title: '产品型号', prop: 'xinghao'},
  {title: '客户批号', prop: 'pihao'},
  {title: '客户名称', prop: 'mingcheng'},
  {title: '工单号', prop: 'gongdan'},
  {title: '测试程序', prop: 'chengxu'},

  {title: '当班人员', prop: 'chengxu'},
  {title: '密码', prop: 'chengxu'},
  {title: '接班人员', prop: 'chengxu'},
  {title: '密码', prop: 'chengxu'},
];

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

const Handover: React.FC = () => {
  const [formValue, setFormValue] = useState<FormProps>({});
  const [isOpen, setIsOpen] = React.useState(true);
  const isFocused = useIsFocused();
  const route = useRoute<any>();
  useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setFormValue({
          ...formValue,
          ...route.params,
        });
        setIsOpen(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, route.params]);

  return (
    <>
      {isOpen ? (
        <HandoverAlert />
      ) : (
        <ScrollView
          flex={1}
          _contentContainerStyle={{
            alignItems: 'center'!,
          }}>
          <Box rounded="lg" width="90%" marginTop={5}>
            <FormControl>
              <Box bg="white" rounded="lg" width="100%" py={5}>
                {formItem.map((node, i) => {
                  return (
                    <OnMachineStack key={i}>
                      <FormControl.Label>{node.title}: </FormControl.Label>
                      <Text>{formValue[node.prop]}</Text>
                    </OnMachineStack>
                  );
                })}
              </Box>
              <Box bg="white" rounded="lg" width="100%" marginTop={5} py={5}>
                <Personnel />
              </Box>
            </FormControl>
          </Box>
        </ScrollView>
      )}
    </>
  );
};

export default Handover;
