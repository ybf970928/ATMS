import React, {useEffect, useState} from 'react';
import {
  Box,
  Heading,
  Button,
  useToast,
  Spinner,
  HStack,
  Input,
} from 'native-base';
import Table from '../../../components/Table';
import {getAllMaterial} from '../../../services/public';
import {doTrackIn} from '../../../services/trackIn';
import {IColProps} from '../../../types/Table';
import {getUserInfo, getLotId} from '../../../utils/user';
import {ToastMessage} from '../../../utils/errorMessageMap';
import {Center} from '../../../layouts/Center';
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
interface consumablesProps {
  innerThread: string;
  consumablesType: string;
  consumablesDesc: string;
  consumablesBarCode: string;
}
interface IInputProps {
  render: (
    eventKeyDown: (
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    ) => void,
  ) => JSX.Element;
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
  {title: '材料信息', dataIndex: 'consumablesType'},
  {title: '物料描述', dataIndex: 'consumablesDesc'},
  {title: '材料代码', dataIndex: 'consumablesBarCode'},
];
// 材料信息
const materialColumns: IColProps<materialProps>[] = [
  {title: '材料信息', dataIndex: 'materialType'},
  {title: '材料代码', dataIndex: 'partNo'},
  {title: '物料描述', dataIndex: 'materialDesc'},
  {title: '供应商代码', dataIndex: 'supplierNo'},
  {title: '供应商', dataIndex: 'supplierDesc'},
  {title: '批号', dataIndex: 'materialLotNo'},
  {title: '有效期', dataIndex: 'effectiveDate'},
  {title: '序列号', dataIndex: 'serialNo'},
];
const CardTable: React.FC = () => {
  const [materialSource, setMaterialSource] = useState<materialProps[]>([]);
  const [consumablesSource, setConsumablesSource] = useState<
    consumablesProps[]
  >([]);
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [materialBox, setMaterialBox] = useState<string[]>([]);
  const [inputs, setinputs] = useState<IInputProps[]>([
    {
      render: eventKeyDown => {
        return (
          <Input
            w={180}
            h={10}
            onSubmitEditing={eventKeyDown}
            multiline={true}
            blurOnSubmit={true}
            mr={2}
            mb={2}
          />
        );
      },
    },
  ]);
  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (e.nativeEvent.text && !materialBox.includes(e.nativeEvent.text)) {
      setMaterialBox(materialBox.concat(e.nativeEvent.text));
      setinputs(
        inputs.concat([
          {
            render: eventKeyDown => {
              return (
                <Input
                  w={180}
                  h={10}
                  onSubmitEditing={eventKeyDown}
                  multiline={true}
                  blurOnSubmit={true}
                  autoFocus
                  mr={2}
                  mb={2}
                />
              );
            },
          },
        ]),
      );
    } else if (e.nativeEvent.text && materialBox.includes(e.nativeEvent.text)) {
      toast.show({
        title: '料盒重复添加',
      });
    }
  };
  useEffect(() => {
    setLoading(true);
    const initTable = async () => {
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
    };
    initTable();
  }, []);

  const handleTrackIn = async () => {
    const {eqpid} = await getUserInfo();
    const currentLotId = await getLotId();
    const res = await doTrackIn({
      eqpId: eqpid,
      lotId: currentLotId!,
    });
    if (res.code === 1) {
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
        <Table dataSource={materialSource} columns={materialColumns} />
      </Box>
      <Box bg="white" rounded="lg" width="100%" marginBottom={5} p={2}>
        <Heading fontSize={16}>耗材信息</Heading>
        <Table dataSource={consumablesSource} columns={consumablesColumns} />
      </Box>
      <Box bg="white" rounded="lg" width="100%" marginBottom={5} p={2}>
        <Heading fontSize={16}>料盒信息</Heading>
        <HStack flexWrap="wrap" mt={6}>
          {inputs.map((item, index) => {
            return <View key={index}>{item.render(handleKeyDown)}</View>;
          })}
        </HStack>
      </Box>
      <Box width="100%" marginBottom={5} p={2}>
        <Button onPress={handleTrackIn}>确认出机</Button>
      </Box>
    </>
  );
};

export default CardTable;
