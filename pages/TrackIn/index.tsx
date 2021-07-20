import {IconOutline} from '@ant-design/icons-react-native';
import {Box, Button, Heading, Input, Stack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {navigate} from '../../utils/RootNavigation';
import {useIsFocused, useRoute} from '@react-navigation/native';

interface ColumnProps {
  label: string;
  prop: string;
}
const TableColumn: ColumnProps[] = [
  {label: '生产流程: ', prop: 'test'},
  {label: '产品型号: ', prop: 'test'},
  {label: '封装形式: ', prop: 'test'},
  {label: '客户批号: ', prop: 'test'},
  {label: '客户名称: ', prop: 'test'},
  {
    label: '工单号: ',
    prop: '自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行自动换行',
  },
  {label: '测试程序: ', prop: 'test'},
];
const TrackIn: React.FC = () => {
  const [handleId, setHandleId] = useState<string>('');
  const isFocused = useIsFocused();
  const route = useRoute<any>();
  useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setHandleId(route.params.code);
      }
    }
  }, [isFocused, route.params]);
  return (
    <ScrollView style={styles.scrollView}>
      <Box bg="white" shadow={2} maxWidth="100%" marginBottom={5}>
        <Stack space={2} p={[4, 4, 4, 2]}>
          <Heading size="md" noOfLines={2} fontSize="sm">
            基础信息
          </Heading>
          <Box flexDirection="row" height={10} w={'98%'}>
            <Input
              w={250}
              mx={3}
              placeholder="扫描或者输入测试随工单号"
              size="xs"
              value={handleId}
              onChangeText={(value: string) => setHandleId(value)}
              InputRightElement={
                <IconOutline
                  size={20}
                  name="scan"
                  style={{padding: 10!}}
                  onPress={() => navigate('ScanQRCode')}
                />
              }
            />
            <Input w={250} mx={3} placeholder="输入测试机编号" size="xs" />
            <Button onPress={() => {}} size="xs" w={50}>
              确定
            </Button>
          </Box>
          {TableColumn.map(node => {
            return (
              <Box
                justifyContent="space-between"
                flexDirection="row"
                key={node.label}>
                <Text w="18%">{node.label}</Text>
                <Text w="80%" textAlign="right">
                  {node.prop}
                </Text>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Box bg="white" shadow={2} maxWidth="100%">
        <Stack space={2} p={[4, 4, 4, 2]}>
          <Heading size="md" noOfLines={2} fontSize="sm">
            材料信息
          </Heading>
          <Box>待定....</Box>
        </Stack>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
  },
});
export default TrackIn;
