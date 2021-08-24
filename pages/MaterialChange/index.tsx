import {Box, Heading, Text, Pressable} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Consumables from './components/Consumables';
import MaterialsInfo from './components/MaterialsInfo';
import MaterialBox from './components/materialBox';
import {useNavigation} from '@react-navigation/native';
import {getMaterials} from '../../services/materials';

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

const MaterialChange: React.FC = () => {
  const navigation = useNavigation();
  const [jobNumber, setjobNumber] = useState<string>('');
  const [consumablesList, setConsumablesList] = useState<ConsumablesProps[]>(
    [],
  );
  const [materialList, setMaterialList] = useState<MateriaProps[]>([]);
  const [materialBoxList, setMaterialBoxList] = useState<MaterialBoxProps[]>(
    [],
  );
  useEffect(() => {
    const getInit = async () => {
      // 临时调试
      const res = await getMaterials({lotId: 132, eqpId: 'TH-062'});
      const {stepId, consumablesInfo, materialInfo, materialBoxInfo} = res.data;
      setjobNumber(stepId);
      setConsumablesList(consumablesInfo);
      setMaterialList(materialInfo);
      setMaterialBoxList(materialBoxInfo);
    };
    getInit();
  }, []);
  return (
    <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <View style={styles.materialsTitle}>
            <Text>作业批号: </Text>
            <Text>{jobNumber}</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('MaterialsHistory')}>
            <Text style={styles.historyTitle}>查看物料历史记录</Text>
          </Pressable>
        </View>
        <Box
          rounded="lg"
          width="100%"
          p={2}
          flexDirection="row"
          flexWrap="wrap">
          <Heading size="md" noOfLines={2} fontSize="sm" w={'100%'}>
            耗材信息
          </Heading>
          {consumablesList.map((item, index) => (
            <Consumables item={item} key={index} />
          ))}
        </Box>
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
          <MaterialsInfo dataSource={materialList} />
          <MaterialBox dataSource={materialBoxList} />
        </Box>
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
  cardHead: {
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  materialsTitle: {
    flexDirection: 'row',
  },
  historyTitle: {
    color: '#3b82f6',
  },
});
export default MaterialChange;
