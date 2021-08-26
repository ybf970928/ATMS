import React from 'react';
import {Box, Heading, Switch, Input, Button} from 'native-base';
import {ScrollView, View} from 'react-native';
import {IColProps} from '../../../types/Table';
// import Table from '../../../components/Table';
import TableV2 from '../../../components/TableV2';
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
  {
    title: '条码',
    dataIndex: 'id',
    width: '25%',
    render: ({onChange, value}) => {
      return <Input h={10} value={value} onChangeText={onChange} />;
    },
  },
  {title: '键合头', dataIndex: 'email', width: 100},
  {
    title: '是否勾选',
    dataIndex: 'isChecked',
    render: ({onChange, value}) => {
      return (
        <View style={{alignItems: 'flex-start'!}}>
          <Switch
            onToggle={(val: boolean) => onChange(val)}
            isChecked={value ? true : false}
            onTrackColor="blue.500"
          />
        </View>
      );
    },
  },
  {
    title: '操作',
    dataIndex: 'id',
    render: ({value}, handleSubmit, setValue) => {
      return (
        <Button
          onPress={handleSubmit((data: any) => {
            setValue('id', '1111');
            console.log(data, value);
          })}>
          新增
        </Button>
      );
    },
  },
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
        {/* <Table dataSource={dataSource} columns={columns} /> */}
        <TableV2 dataSource={dataSource} columns={columns} />
      </Box>
    </ScrollView>
  );
};

export default MaterialsHistory;
