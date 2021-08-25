import {Box, Button, Switch, Input} from 'native-base';
import React, {useState} from 'react';

import Table from '../../../components/Table';
import {IColProps} from '../../../types/Table';
import {MateriaProps} from '../index';
import {getUserInfo} from '../../../utils/user';
import {doUpdate} from '../../../services/materials';

type MaterialType = {
  dataSource: MateriaProps[];
  stepId: string;
};
const MaterialsInfo: React.FC<MaterialType> = ({dataSource, stepId}) => {
  const [editingKey, setEditingKey] = useState<number[]>([]);
  const isEditing = (index: number) => editingKey.includes(index);
  const onSubmit = async (text: string, data: MateriaProps, index: number) => {
    const {eqpid} = await getUserInfo();
    const res = await doUpdate({
      cType: data.materialType,
      lotId: '132', //先写死
      eqpId: eqpid,
      stepId,
      barCode: data.materialBarCode,
      bondingHead: data.bondingHead,
      oldBarCode: text,
      check: data.checked ? 1 : 0,
    });
    if (res.code === 1) {
      setEditingKey(editingKey.concat(index));
    }
  };

  const columns: IColProps<MateriaProps>[] = [
    {title: '材料类型', dataIndex: 'materialType'},
    {
      title: '条码',
      dataIndex: 'materialBarCode',
      render: (text, record) => {
        return (
          <Input
            defaultValue={text}
            onChangeText={(val: string) => (record!.materialBarCode = val)}
            w={60}
            height={10}
          />
        );
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
      dataIndex: 'materialBarCode',
      render: (text, record, index) => {
        const editable = isEditing(index!);
        return (
          <Button
            size="xs"
            colorScheme={editable ? 'green' : 'blue'}
            rounded="lg"
            onPress={() => onSubmit(text, record!, index!)}>
            {editable ? '已确认' : '确认新增'}
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
