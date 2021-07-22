import {Box, Heading, Stack, Text} from 'native-base';
import React from 'react';

interface ColumnProps {
  label: string;
  prop: string;
  render?: () => JSX.Element;
}

const BaseInfoTable: React.FC = () => {
  const TableColumn: ColumnProps[] = [
    {label: '分选机编号: ', prop: 'handleId'},
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
  return (
    <Box bg="white" maxWidth="100%" marginBottom={5} rounded="lg">
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
                  {node.prop}
                </Text>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default BaseInfoTable;
