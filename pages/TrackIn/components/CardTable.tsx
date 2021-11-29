import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Box, Heading, useToast, Spinner} from 'native-base';
// import Table, {TableProps} from '../../../components/Table';
import {getAllMaterial} from '../../../services/public';
import {doTrackIn} from '../../../services/trackIn';
import {getUserInfo, setLotId} from '../../../utils/user';
import {ToastMessage} from '../../../utils/errorMessageMap';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Center} from '../../../layouts/Center';
import LoadingButton from '../../../components/LoadingButton';
import {UseFormHandleSubmit} from 'react-hook-form';
import {AuthContext} from '../../../layouts/AuthProvider';
import TableV2 from '../../../components/TableV2';
import {IColProps} from '../../../types/Table';
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
const CardTable: React.FC<{
  lotId: string;
  trackStatus: 0 | 1;
  handleSubmit: UseFormHandleSubmit<any>;
}> = ({lotId, trackStatus, handleSubmit}) => {
  const [materialSource, setMaterialSource] = useState<materialProps[]>([]);
  const [consumablesSource, setConsumablesSource] = useState<
    consumablesProps[]
  >([]);
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const {checkTrackOut} = useContext(AuthContext);

  useEffect(() => {
    if (lotId) {
      setLoading(true);
      const initTable = async () => {
        const {eqpid} = await getUserInfo();
        const res = await getAllMaterial({
          eqpId: eqpid,
          lotId: lotId,
        });
        const {consumablesInfo, materialInfo} = res.data;
        setMaterialSource(materialInfo);
        setConsumablesSource(consumablesInfo);
        setLoading(false);
      };
      initTable();
      return () => {
        setLoading(false);
      };
    }
  }, [lotId]);

  const handleTrackIn = async () => {
    const {eqpid} = await getUserInfo();
    const res = await doTrackIn({
      eqpId: eqpid,
      lotId: lotId,
    });
    if (res.code === 1) {
      setLotId(lotId).then(() => {
        checkTrackOut(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );
      });
    }
    toast.show({
      title: ToastMessage(res),
    });
  };

  if (loading) {
    return (
      <Box bg="white" maxWidth="100%" p={2} mt={2} rounded="lg">
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
      <Box width="100%" marginBottom={5} p={2}>
        <LoadingButton
          title="确认进机"
          onPress={handleSubmit(handleTrackIn)}
          isDisabled={trackStatus}
        />
      </Box>
    </>
  );
};

export default CardTable;
