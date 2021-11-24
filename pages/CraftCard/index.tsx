import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {HStack, Text} from 'native-base';
import {getCardPath} from '../../services/craftCard';
import {getUserInfo, getLotId} from '../../utils/user';
// import {BASE_API} from '../../utils/request';
import {getLotInfo} from '../../services/public';
const CraftCard: React.FC = () => {
  const [imgInfo, setImgInfo] = useState<{
    path: string;
    name: string;
    assemblyLotID: string;
  }>({
    path: '',
    name: '',
    assemblyLotID: '',
  });
  const getCardImage = async () => {
    try {
      const {eqpid} = await getUserInfo();
      const lotId = await getLotId();
      const {
        data: {processCardName, assemblyLotID},
      } = await getLotInfo({
        lotId: lotId!,
        eqpId: eqpid,
      });
      const res = await getCardPath({lotId: lotId as string, eqpId: eqpid});
      setImgInfo({
        path: res.data,
        name: processCardName,
        assemblyLotID: assemblyLotID,
      });
    } catch (error) {}
  };
  useEffect(() => {
    getCardImage();
  }, []);

  return (
    <ScrollView style={{flex: 1!}}>
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <HStack space={3}>
            <Text>组装批号: </Text>
            <Text>{imgInfo.assemblyLotID}</Text>
          </HStack>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: `http://10.57.17.146/${imgInfo.path}/${imgInfo.name}`,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  cardHead: {
    width: '80%',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  image: {
    width: '80%',
    height: 400,
  },
});
export default CraftCard;
