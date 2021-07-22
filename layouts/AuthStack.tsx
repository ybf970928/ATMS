import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

export const AuthStack: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        getComponent={() => require('../pages/Login').default}
        options={{
          header: () => null,
          // headerTitle: '欢迎使用赛美特智能制造系统',
          // headerTitleAlign: 'center',
          // headerTitleStyle: {color: '#1890FF'},
        }}
      />
    </Stack.Navigator>
  );
};
