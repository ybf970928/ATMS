import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {HStack, Text} from 'native-base';
import {getCardPath} from 'services/craftCard';
import {getEqpId} from 'utils/user';
import {getLotInfo} from 'services/public';
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

  const replaceFile = (url: string) => {
    return url.replace(/^file/g, 'http');
  };

  const replaceFormat = (url: string) => {
    return url.replace(/(JPGE|PNG|JPG)/g, $1 => {
      return $1.toLowerCase();
    });
  };

  const getCardImage = async () => {
    try {
      const eqpId = await getEqpId();
      const info = await getLotInfo({eqpId});
      setImgInfo(preState => {
        return {
          ...preState,
          name: replaceFormat(info.data.processCardName),
          assemblyLotID: info.data.assemblyLotID,
        };
      });
    } catch (error) {}
  };

  const cardPath = async () => {
    const res = await getCardPath();
    setImgInfo(preState => {
      return {
        ...preState,
        path: replaceFile(res.data),
      };
    });
  };

  useEffect(() => {
    getCardImage();
    cardPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            uri: `${imgInfo.path}/${imgInfo.name}`,
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
