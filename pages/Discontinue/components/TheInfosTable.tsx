import React, {useEffect, useState} from 'react';
import {Box, Center, Heading, Spinner} from 'native-base';
import Table from '../../../components/Table';
import {getAllMaterial} from '../../../services/public';
import {getLotId, getUserInfo} from '../../../utils/user';

interface ConsumablesProp {
  consumablesType: string;
  consumablesBarCode: string;
}

interface MaterialProp {
  materialType: string;
  materialBarCode: string;
}

const Consumableslumns = [
  {title: '物料类型', dataIndex: 'consumablesType'},
  {title: '条码', dataIndex: 'consumablesBarCode'},
];

const Materialcolumns = [
  {title: '物料类型', dataIndex: 'materialType'},
  {title: '条码', dataIndex: 'materialBarCode'},
];

const ShowInfoTable: React.FC = () => {
  const [table, setTable] = useState<{
    consumables: ConsumablesProp[];
    material: MaterialProp[];
  }>({
    consumables: [],
    material: [],
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initTable = async () => {
      const {eqpid} = await getUserInfo();
      const currentLotId = await getLotId();
      const res = await getAllMaterial({
        eqpId: eqpid,
        lotId: currentLotId!,
      });
      if (res.code === 1) {
        const {consumablesInfo, materialInfo} = res.data;
        setTable({
          consumables: consumablesInfo,
          material: materialInfo,
        });
        setLoading(false);
      }
    };
    initTable();
    return () => {
      setLoading(false);
    };
  }, []);

  if (loading) {
    return (
      <Center bg="white">
        <Spinner color="blue.500" />
      </Center>
    );
  }

  return (
    <>
      <Box bg="white" rounded="lg" width="100%" p={2}>
        <Heading size="md" noOfLines={2} fontSize="sm" w={'100%'}>
          耗材信息
        </Heading>
        <Table dataSource={table.consumables} columns={Consumableslumns} />
      </Box>
      <Box rounded="lg" width="100%" bg="white" mt={4} p={2}>
        <Heading size="md" noOfLines={2} fontSize="sm" w={'100%'}>
          材料信息
        </Heading>
        <Table dataSource={table.material} columns={Materialcolumns} />
      </Box>
    </>
  );
};

export default React.memo(ShowInfoTable);
