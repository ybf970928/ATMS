import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {addProductRoutes} from './addProductRoutes';
import {AuthProductList} from '../types/ProductRoutes';
export const AppStack: React.FC = () => {
  const Stack = createStackNavigator<AuthProductList>();
  return <Stack.Navigator>{addProductRoutes(Stack)}</Stack.Navigator>;
};
