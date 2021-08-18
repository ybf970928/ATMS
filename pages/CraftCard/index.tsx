import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {HStack, Text} from 'native-base';

const CraftCard: React.FC = () => {
  return (
    <ScrollView style={{flex: 1!}}>
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <HStack space={3}>
            <Text>组装批号: </Text>
            <Text>CL17DYE-1</Text>
          </HStack>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: 'https://ae01.alicdn.com/kf/Hb8bf24ec1ffe4298b459767d2ad8a1aeC.png',
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
