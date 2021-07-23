import React from 'react';
import {View, Text, StatusBar} from 'react-native';
const Message: React.FC = () => {
  return (
    <View style={{paddingTop: StatusBar.currentHeight}}>
      <Text>message页面</Text>
    </View>
  );
};
export default Message;
