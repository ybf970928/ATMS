import {Box} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Item} from '../../components/Item';
const My: React.FC = () => {
  return (
    <View style={styles.content}>
      <View style={styles.userinfo}>
        <View style={styles.avatar} />
        <View>
          <Text>用户名位置</Text>
        </View>
      </View>
      <Box bg="white" width="94%" rounded="lg" mx={'auto'}>
        <Item title="dsjhbjhsdbjch" />
        <Item title="bgkokfgbfgbnfn" />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  userinfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    marginRight: 20,
  },
});

export default My;
