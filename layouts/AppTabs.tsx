import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {addProductRoutes} from '../layouts/addProductRoutes';
import {AuthProductList} from '../types/ProductRoutes';

export const headerStyle: StackNavigationOptions = {
  headerTitleStyle: {color: '#fff'},
  headerStyle: {
    backgroundColor: '#3b82f6',
  },
  headerTintColor: '#fff', //Tint color for the header 箭头颜色啥的
};

export const AppTabs = () => {
  const Stack = createStackNavigator<AuthProductList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        getComponent={() => require('../pages/ProductsMain').default}
        options={{
          headerTitle: 'ATMS',
          ...headerStyle,
        }}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
