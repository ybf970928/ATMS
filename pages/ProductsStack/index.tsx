import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {addProductRoutes} from '../../layouts/addProductRoutes';
import {AuthProductList} from '../../types/ProductRoutes';
const ProductsStack: React.FC = () => {
  const Stack = createStackNavigator<AuthProductList>();
  return (
    <Stack.Navigator initialRouteName="Home">
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default ProductsStack;
