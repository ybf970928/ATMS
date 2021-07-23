import React from 'react';
import {View, Text, StatusBar} from 'react-native';
const My: React.FC = () => {
  return (
    <View style={{paddingTop: StatusBar.currentHeight}}>
      <Text>My页面</Text>
    </View>
  );
};
export default My;
