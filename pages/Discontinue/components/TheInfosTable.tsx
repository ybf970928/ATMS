import React, {useEffect, useState, useContext} from 'react';
import {Box, Center, Heading, Spinner} from 'native-base';
import Table from '../../../components/Table';
import {getAllMaterial} from 'services/public';
import {getEqpId} from 'utils/user';
import {AuthContext} from 'layouts/AuthProvider';

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
  {title: '材料类型', dataIndex: 'materialType'},
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
  const {lotForm} = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initTable = async () => {
      try {
        const eqpId = await getEqpId();
        const res = await getAllMaterial({
          eqpId: eqpId,
          lotId: lotForm.lotId,
        });
        if (res.code === 1) {
          const {consumablesInfo, materialInfo} = res.data;
          setTable({
            consumables: consumablesInfo,
            material: materialInfo,
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    initTable();
  }, [lotForm.lotId]);

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
        <Heading size="md" noOfLines={2} fontSize={16} w={'100%'}>
          耗材信息
        </Heading>
        <Table dataSource={table.consumables} columns={Consumableslumns} />
      </Box>
      <Box rounded="lg" width="100%" bg="white" mt={4} p={2}>
        <Heading size="md" noOfLines={2} fontSize={16} w={'100%'}>
          材料信息
        </Heading>
        <Table dataSource={table.material} columns={Materialcolumns} />
      </Box>
    </>
  );
};

export default React.memo(ShowInfoTable);
