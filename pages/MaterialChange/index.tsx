import {Box, Heading, Input, Spinner, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import Consumables from './components/Consumables';
import MaterialBox from './components/materialBox';
import EditableRow from './components/EditableRow';
import {useNavigation} from '@react-navigation/native';
import {getMaterials} from '../../services/materials';
import {getUserInfo, getLotId} from '../../utils/user';
import {Center} from '../../layouts/Center';
import {useForm, Controller} from 'react-hook-form';
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

interface LotIdFormProp {
  lotId: string;
}

const MaterialChange: React.FC = () => {
  const navigation = useNavigation();
  const [jobNumber, setjobNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentLotId, setCurrentLotId] = useState<string>('');
  const [data, setData] = useState<DataProp>({
    consumablesList: [],
    materialList: [],
    materialBoxList: [],
  });
  const {control, setValue} = useForm<LotIdFormProp>({
    defaultValues: {
      lotId: currentLotId,
    },
  });

  const handleSetLotId = (lotId: string) => {
    const getInfo = async () => {
      setLoading(true);
      const {eqpid} = await getUserInfo();
      const res = await getMaterials({lotId: lotId, eqpId: eqpid});
      const {stepId, ...obj} = res.data;
      setjobNumber(stepId);
      setData({
        consumablesList: obj.consumablesInfo || [],
        materialList: obj.materialInfo || [],
        materialBoxList: obj.materialBoxInfo || [],
      });
      setLoading(false);
      setCurrentLotId(lotId);
    };
    getInfo();
  };

  useEffect(() => {
    const alreadyTrackIn = async () => {
      const lotId = await getLotId();
      if (lotId) {
        setValue('lotId', lotId);
        handleSetLotId(lotId);
      }
    };
    alreadyTrackIn();
  }, [setValue]);

  return (
    <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <View style={styles.materialsTitle}>
            <Text>作业批号: </Text>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  w={180}
                  h={10}
                  onSubmitEditing={() => handleSetLotId(value)}
                  multiline={true}
                  blurOnSubmit={true}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="lotId"
            />
          </View>
          <Pressable onPress={() => navigation.navigate('MaterialsHistory')}>
            <Text style={styles.historyTitle}>查看物料历史记录</Text>
          </Pressable>
        </View>
        {loading ? (
          <Center>
            <Spinner color="blue.500" />
          </Center>
        ) : (
          <View>
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
                  <Consumables
                    stepId={jobNumber}
                    lotId={currentLotId}
                    item={item}
                    key={index}
                  />
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
                <EditableRow
                  dataSource={data.materialList}
                  lotId={currentLotId}
                  stepId={jobNumber}
                />
                <MaterialBox
                  dataSource={data.materialBoxList}
                  lotId={currentLotId}
                  stepId={jobNumber}
                />
              </Box>
            ) : null}
          </View>
        )}
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
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  materialsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTitle: {
    color: '#3b82f6',
  },
});
export default MaterialChange;
