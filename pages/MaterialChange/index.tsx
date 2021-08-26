import {Box, Heading, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Consumables from './components/Consumables';
// import MaterialsInfo from './components/MaterialsInfo';
import LotIdHeader from './components/LotIdHeader';
import MaterialBox from './components/materialBox';
import EditableRow from './components/EditableRow';

import {getMaterials} from '../../services/materials';
import {getUserInfo, getLotId, setLotId} from '../../utils/user';
import {Center} from '../../layouts/Center';

export interface ConsumablesProps {
  consumablesType: string;
  innerThread: string;
  consumablesBarCode: string;
  bondingHead: string;
  checked: boolean;
}

export interface MateriaProps {
  materialType: string;
  materialBarCode: string;
  bondingHead: string;
  checked: boolean;
}

export interface MaterialBoxProps {
  materialType: string;
  materialBarCode: string;
}

interface DataProp {
  consumablesList: ConsumablesProps[];
  materialList: MateriaProps[];
  materialBoxList: MaterialBoxProps[];
}

const MaterialChange: React.FC = () => {
  const [jobNumber, setjobNumber] = useState<string>('');
  // const [consumablesList, setConsumablesList] = useState<ConsumablesProps[]>(
  //   [],
  // );
  // const [materialList, setMaterialList] = useState<MateriaProps[]>([]);
  // const [materialBoxList, setMaterialBoxList] = useState<MaterialBoxProps[]>(
  //   [],
  // );
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<DataProp>({
    consumablesList: [],
    materialList: [],
    materialBoxList: [],
  });

  const getInit = async () => {
    const isHasLotId = await getLotId();
    if (isHasLotId) {
      setLoading(true);
      const {eqpid} = await getUserInfo();
      const res = await getMaterials({lotId: isHasLotId, eqpId: eqpid});
      // const {stepId, consumablesInfo, materialInfo, materialBoxInfo} = res.data;
      const {stepId, ...obj} = res.data;
      setjobNumber(stepId);
      setData({
        consumablesList: obj.consumablesInfo || [],
        materialList: obj.materialInfo || [],
        materialBoxList: obj.materialBoxInfo || [],
      });
      // setConsumablesList(consumablesInfo);
      // setMaterialList(materialInfo);
      // setMaterialBoxList(materialBoxInfo);
      setLoading(false);
    }
  };

  useEffect(() => {
    getInit();
  }, []);

  const handleSetLotId = (lotId: string) => {
    setLotId(lotId);
    getInit();
  };

  if (loading) {
    return (
      <Center>
        <Spinner color="blue.500" />
      </Center>
    );
  }

  return (
    <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <LotIdHeader setLotId={handleSetLotId} />
        {data.consumablesList.length > 0 ? (
          <Box
            rounded="lg"
            width="100%"
            p={2}
            flexDirection="row"
            flexWrap="wrap">
            <Heading size="md" noOfLines={2} fontSize="sm" w={'100%'}>
              耗材信息
            </Heading>
            {data.consumablesList.map((item, index) => (
              <Consumables stepId={jobNumber} item={item} key={index} />
            ))}
          </Box>
        ) : null}
        {data.materialList.length > 0 ? (
          <Box
            rounded="lg"
            width="100%"
            p={2}
            flexDirection="row"
            flexWrap="wrap">
            <Heading
              size="md"
              noOfLines={2}
              fontSize="sm"
              w={'100%'}
              paddingBottom={4}>
              材料信息
            </Heading>
            <EditableRow dataSource={data.materialList} stepId={jobNumber} />
            <MaterialBox dataSource={data.materialBoxList} stepId={jobNumber} />
          </Box>
        ) : null}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    // padding: 10,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
});
export default MaterialChange;
