import {Box, Button, Switch, Input} from 'native-base';
import React from 'react';
import Table from '../../../components/Table';
import {IColProps} from '../../../types/Table';
import {MateriaProps} from '../index';

type MaterialType = {
  dataSource: MateriaProps[];
};
const MaterialsInfo: React.FC<MaterialType> = ({dataSource}) => {
  const columns: IColProps<MateriaProps>[] = [
    {title: '材料类型', dataIndex: 'materialType'},
    {
      title: '条码',
      dataIndex: 'materialBarCode',
      render: text => {
        return <Input defaultValue={text} w={60} height={10} />;
      },
    },
    {title: '键合头', dataIndex: 'bondingHead'},
    {
      title: '是否勾选',
      dataIndex: 'checked',
      render: text => {
        return (
          <Switch
            defaultIsChecked={text ? true : false}
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
      marginBottom={6}
      flexDirection="row"
      flexWrap="wrap">
      <Table dataSource={dataSource} columns={columns} />
    </Box>
  );
};
export default MaterialsInfo;