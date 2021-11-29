import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// 权限页面暂时不搞
export const AuthStack: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        getComponent={() => require('../pages/Login').default}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
