import {Box, Heading, Spinner} from 'native-base';
import React, {useState, useEffect} from 'react';
import TableV2 from '../../../components/TableV2';
import {IColProps} from '../../../types/Table';
import {getAllMaterial} from '../../../services/public';
import {getLotId, getUserInfo} from '../../../utils/user';
import {Center} from '../../../layouts/Center';
import {ScrollView} from 'react-native';
interface consumablesProps {
  innerThread: string;
  consumablesType: string;
  consumablesDesc: string;
  consumablesBarCode: string;
}
interface materialProps {
  materialType: string;
  partNo: string;
  materialDesc: string;
  supplierNo: string;
  supplierDesc: boolean;
  materialLotNo: string;
  effectiveDate: string;
  serialNo: string;
}

// 耗材信息
const consumablesColumns: IColProps<consumablesProps>[] = [
  {title: '内引线规格', dataIndex: 'innerThread'},
  {title: '物料类型', dataIndex: 'consumablesType'},
  {title: '物料描述', dataIndex: 'consumablesDesc'},
  {title: '条码', dataIndex: 'consumablesBarCode'},
];
// 材料信息
const materialColumns: IColProps<materialProps>[] = [
  {title: '类型', dataIndex: 'materialType'},
  {title: '材料代码', dataIndex: 'partNo', width: 120},
  {title: '供应商代码', dataIndex: 'supplierNo', width: 140},
  {title: '供应商', dataIndex: 'supplierDesc', width: 280},
  {title: '批号', dataIndex: 'materialLotNo'},
  {title: '有效期', dataIndex: 'effectiveDate'},
  {title: '序列号', dataIndex: 'serialNo'},
  {title: '描述', dataIndex: 'materialDesc', width: 180},
];

const InfosTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [materialSource, setMaterialSource] = useState<materialProps[]>([]);
  const [consumablesSource, setConsumablesSource] = useState<
    consumablesProps[]
  >([]);

  useEffect(() => {
    setLoading(true);
    const initTable = async () => {
      try {
        const {eqpid} = await getUserInfo();
        const currentLotId = await getLotId();
        const res = await getAllMaterial({
          eqpId: eqpid,
          lotId: currentLotId!,
        });
        const {consumablesInfo, materialInfo} = res.data;
        setMaterialSource(materialInfo);
        setConsumablesSource(consumablesInfo);
        setLoading(false);
      } catch (error) {
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
      <Box bg="white" maxWidth="100%" p={2} mt={2} rounded="lg" minHeight={200}>
        <Center>
          <Spinner color="blue.500" />
        </Center>
      </Box>
    );
  }
  return (
    <>
      <Box
        bg="white"
        rounded="lg"
        width="100%"
        marginTop={5}
        marginBottom={5}
        p={2}>
        <Heading fontSize={16}>材料信息</Heading>
        <ScrollView horizontal>
          <Box w={1000}>
            <TableV2 dataSource={materialSource} columns={materialColumns} />
          </Box>
        </ScrollView>
      </Box>
      <Box bg="white" rounded="lg" width="100%" marginBottom={5} p={2}>
        <Heading fontSize={16}>耗材信息</Heading>
        <TableV2 dataSource={consumablesSource} columns={consumablesColumns} />
      </Box>
    </>
  );
};
export default InfosTable;
