import {Box, Button, Switch} from 'native-base';
import React from 'react';
import Table from '../../../components/Table';
import {IColProps} from '../../../types/Table';
export interface IDataSource {
  id: string;
  title: string;
  type: string;
  email: string;
  isChecked: number;
  code: string;
}

interface IFormProps {
  type: string;
  spe: string;
  code: string;
  head: string;
  isChecked: boolean;
}

const MaterialsInfo: React.FC = () => {
  const dataSource: IDataSource[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      type: 'laldal',
      email: 'dasdasdasdsadas',
      isChecked: 1,
      code: 'daasas',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      type: 'dasdsasd',
      email: 'brfdfd2',
      isChecked: 0,
      code: 'adasdas',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      type: 'f232',
      email: 'vb fgerf21',
      isChecked: 0,
      code: '321vfdvdf',
    },
  ];
  const columns: IColProps<IDataSource>[] = [
    {title: '材料类型', dataIndex: 'title'},
    {title: '内引线规格', dataIndex: 'type'},
    {title: '条码', dataIndex: 'code'},
    {title: '键合头', dataIndex: 'email'},
    {
      title: '是否勾选',
      dataIndex: 'isChecked',
      render: text => {
        return (
          <Switch
            isChecked={text ? true : false}
            onToggle={(val: boolean) => console.log(val)}
            onTrackColor="blue.500"
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: '',
      render: (text, record) => {
        return (
          <Button
            size="xs"
            colorScheme="green"
            rounded="lg"
            onPress={() => console.log(text, record)}>
            已确认
          </Button>
        );
      },
    },
  ];
  return (
    <Box
      bg="white"
      rounded="lg"
      width="100%"
      flexDirection="row"
      flexWrap="wrap">
      <Table dataSource={dataSource} columns={columns} />
    </Box>
  );
};
export default MaterialsInfo;
