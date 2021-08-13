import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {headerStyle} from '../../layouts/AppTabs';

const MessagePage: React.FC = () => {
  return (
    <View>
      <Text>message页面</Text>
    </View>
  );
};

const Message = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My"
        component={MessagePage}
        options={{
          headerTitle: '消息列表',
          headerTitleAlign: 'center',
          ...headerStyle,
        }}
      />
    </Stack.Navigator>
  );
};
export default Message;
