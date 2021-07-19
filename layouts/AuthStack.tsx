import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

export const AuthStack: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        getComponent={() => require('../pages/Login').default}
      />
    </Stack.Navigator>
  );
};
