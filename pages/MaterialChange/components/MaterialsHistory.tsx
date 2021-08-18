import React from 'react';
import {Box, Heading} from 'native-base';
import {ScrollView} from 'react-native';
import {IColProps} from '../../../types/Table';
import Table from '../../../components/Table';
export interface IDataSource {
  id: string;
  title: string;
  type: string;
  email: string;
  isChecked: number;
}

const dataSource: IDataSource[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    type: 'laldal',
    email: 'dasdasdasdsadas',
    isChecked: 1,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    type: 'dasdsasd',
    email: 'brfdfd2',
    isChecked: 0,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    type: 'f232',
    email: 'vb fgerf21',
    isChecked: 0,
  },
];
const columns: IColProps<IDataSource>[] = [
  {title: '材料类型', dataIndex: 'title'},
  {title: '内引线规格', dataIndex: 'type'},
  {title: '条码', dataIndex: 'id'},
  {title: '键合头', dataIndex: 'email'},
  {title: '是否勾选', dataIndex: 'isChecked'},
];
const MaterialsHistory: React.FC = () => {
  return (
    <ScrollView>
      <Box rounded="lg" width="100%" p={2}>
        <Heading
          size="md"
          noOfLines={2}
          fontSize="sm"
          w={'100%'}
          paddingBottom={4}>
          耗材信息
        </Heading>
        <Table dataSource={dataSource} columns={columns} />
      </Box>
    </ScrollView>
  );
};

export default MaterialsHistory;
