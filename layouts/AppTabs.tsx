import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {addProductRoutes} from '../layouts/addProductRoutes';
import {AuthProductList} from '../types/ProductRoutes';

export const AppTabs = () => {
  const Stack = createStackNavigator<AuthProductList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        getComponent={() => require('../pages/ProductsMain').default}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
