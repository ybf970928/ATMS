import React, {useEffect, useState} from 'react';
import {Box, Heading, Switch, Input} from 'native-base';
import {ScrollView, View} from 'react-native';
import {IColProps} from '../../../types/Table';
import {getMaterialHistory} from '../../../services/materials';
import TableV2 from '../../../components/TableV2';
import {getLotId, getUserInfo} from '../../../utils/user';

// import HTTPGet from '../../../components/HTTPGet';

export interface IDataSource {
  id: string;
  materialType: string;
  innerThread: string;
  materailBarCode: string;
  bondingHead: string;
  checked: 1 | 0;
  systemTime: string;
  operId: string;
}

const consumablesList: IColProps<IDataSource>[] = [
  {title: '物料类型', dataIndex: 'materialType'},
];
const materialList: IColProps<IDataSource>[] = [
  {title: '材料类型', dataIndex: 'materialType'},
];

const columns: IColProps<IDataSource>[] = [
  {title: '内引线规格', dataIndex: 'innerThread'},
  {
    title: '条码',
    dataIndex: 'materailBarCode',
    width: '25%',
    render: ({value}) => {
      return <Input value={value} isDisabled />;
    },
  },
  {title: '键合头', dataIndex: 'bondingHead', width: 100},
  {
    title: '是否勾选',
    dataIndex: 'checked',
    render: ({value}) => {
      return (
        <View style={{alignItems: 'flex-start'!}}>
          <Switch
            disabled
            isChecked={value ? true : false}
            onTrackColor="blue.500"
          />
        </View>
      );
    },
  },
];
const MaterialsHistory: React.FC = () => {
  const [dataSource, setDataSource] = useState({
    materials: [],
    consumables: [],
  });

  const getList = async () => {
    try {
      const {eqpid} = await getUserInfo();
      const lotId = await getLotId();
      const res = await getMaterialHistory({eqpId: eqpid, lotId: lotId!});
      setDataSource({
        materials: res.data.materials,
        consumables: res.data.consumables,
      });
    } catch (error) {
      setDataSource({
        materials: [],
        consumables: [],
      });
      console.log(error, 'errs');
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
        <TableV2
          dataSource={dataSource.consumables}
          columns={consumablesList.concat(columns)}
        />
        {/* <HTTPGet
          request={async () => {
            try {
              const {eqpid} = await getUserInfo();
              const lotId = await getLotId();
              const {data} = await getMaterialHistory({
                eqpId: eqpid,
                lotId: lotId!,
              });
              return data;
            } catch (error) {
              console.log(error, 'errs');
              throw new Error(error);
            }
          }}
          loading={<Text>loading...</Text>}>
          {(data: IDataSource[]) => {
            return data.map(item => (
              <Text key={item.id}>{item.MaterialType}</Text>
            ));
          }}
        </HTTPGet> */}
      </Box>
      <Box rounded="lg" width="100%" p={2}>
        <Heading
          size="md"
          noOfLines={2}
          fontSize="sm"
          w={'100%'}
          paddingBottom={4}>
          材料信息
        </Heading>
        <TableV2
          dataSource={dataSource.materials}
          columns={materialList.concat(
            columns.filter(col => col.dataIndex !== 'innerThread'),
          )}
        />
      </Box>
    </ScrollView>
  );
};

export default MaterialsHistory;
