import {Box, Heading, Text, Pressable} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Consumables from './components/Consumables';
import MaterialsInfo from './components/MaterialsInfo';
import {useNavigation} from '@react-navigation/native';

const MaterialChange: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <View style={styles.materialsTitle}>
            <Text>作业批号: </Text>
            <Text>dskjhvdshdsvvdf </Text>
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
          <Consumables />
          <Consumables />
          <Consumables />
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
          <MaterialsInfo />
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
