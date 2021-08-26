import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Pressable, Input} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {getLotId} from '../../../utils/user';
interface LotIdHeaderProp {
  setLotId: (id: string) => void;
}

const LotIdHeader: React.FC<LotIdHeaderProp> = ({setLotId}) => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState<string>('');
  const handleKeyDown = () => {
    setLotId(inputValue);
  };

  useEffect(() => {
    const checkLotId = async () => {
      const res = await getLotId();
      setInputValue(res as string);
    };
    checkLotId();
  }, []);

  return (
    <View style={styles.cardHead}>
      <View style={styles.materialsTitle}>
        <Text>作业批号: </Text>
        <Input
          w={180}
          h={10}
          onSubmitEditing={handleKeyDown}
          multiline={true}
          blurOnSubmit={true}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
        />
      </View>
      <Pressable onPress={() => navigation.navigate('MaterialsHistory')}>
        <Text style={styles.historyTitle}>查看物料历史记录</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default LotIdHeader;
