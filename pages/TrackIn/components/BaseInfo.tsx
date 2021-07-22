import {IconOutline} from '@ant-design/icons-react-native';
import {Box, Heading, Input, Stack, Text, Select, CheckIcon} from 'native-base';
import React from 'react';
import {navigate} from '../../../utils/RootNavigation';
import {TrackinFormProps} from '..';

interface ColumnProps {
  label: string;
  prop: keyof TrackinFormProps;
  render?: () => JSX.Element;
}

interface IProps {
  onOk: () => void;
}

interface FormProps {
  handleId?: string;
  testerId?: string;
}

interface TrackInForm {
  form: TrackinFormProps;
  setFormValue: React.Dispatch<React.SetStateAction<TrackinFormProps>>;
}
const BaseInfoTrackIn: React.FC<TrackInForm> = ({form, setFormValue}) => {
  // const [formValue, setFormValue] = useState<FormProps>({});
  // const isFocused = useIsFocused();
  // const route = useRoute<any>();
  // useEffect(() => {
  //   if (isFocused) {
  //     if (route.params) {
  //       setFormValue({
  //         ...formValue,
  //         ...route.params,
  //       });
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isFocused, route.params]);
  const TableColumn: ColumnProps[] = [
    {
      label: '分选机编号: ',
      prop: 'handleId',
    },
    {
      label: '测试随工单号: ',
      prop: 'handleId',
      render: () => {
        return (
          <Box>
            <Input
              style={{height: 40!}}
              placeholder="扫描或者输入测试随工单号"
              size="xs"
              value={form.handleId}
              onChangeText={(value: string) =>
                setFormValue({...form, handleId: value})
              }
              InputRightElement={
                <IconOutline
                  size={20}
                  name="scan"
                  style={{padding: 10!}}
                  onPress={() =>
                    navigate('ScanQRCode', {
                      formRoute: 'TrackIn',
                      Keyword: 'handleId',
                    })
                  }
                />
              }
            />
          </Box>
        );
      },
    },
    {
      label: '测试机编号: ',
      prop: 'testerId',
      render: () => {
        return (
          <Box>
            <Input
              style={{height: 40!}}
              value={form.testerId}
              onChangeText={(value: string) =>
                setFormValue({...form, testerId: value})
              }
              placeholder="扫描或者输入测试机编号"
              size="xs"
              InputRightElement={
                <IconOutline
                  size={20}
                  name="scan"
                  style={{padding: 10!}}
                  onPress={() =>
                    navigate('ScanQRCode', {
                      formRoute: 'TrackIn',
                      Keyword: 'testerId',
                    })
                  }
                />
              }
            />
          </Box>
        );
      },
    },
    {
      label: '测试步骤: ',
      prop: 'testerId',
      render: () => {
        return (
          <Select
            style={{height: 40!}}
            // selectedValue={language}
            // minWidth={200}
            // maxWidth={300}
            size="xs"
            placeholder="请选择测试步骤"
            // onValueChange={itemValue => setLanguage(itemValue)}
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
        );
      },
    },
    {label: '生产流程: ', prop: 'testerId'},
    {label: '产品型号: ', prop: 'testerId'},
    {label: '封装形式: ', prop: 'testerId'},
    {label: '客户批号: ', prop: 'testerId'},
    {label: '客户名称: ', prop: 'testerId'},
    {
      label: '工单号: ',
      prop: 'testerId',
    },
    {label: '测试程序: ', prop: 'testerId'},
  ];
  return (
    <Box bg="white" shadow={2} maxWidth="100%" marginBottom={5}>
      <Stack space={2} p={[4, 4, 4, 2]}>
        <Heading size="md" noOfLines={2} fontSize="sm">
          基础信息
        </Heading>

        {TableColumn.map(node => {
          return (
            <Box
              justifyContent="space-between"
              flexDirection="row"
              key={node.label}>
              <Text w="20%">{node.label}</Text>
              {node.render ? (
                <Box w="80%">{node.render()}</Box>
              ) : (
                <Text w="80%" textAlign="left">
                  {form[node.prop]}
                </Text>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default BaseInfoTrackIn;
