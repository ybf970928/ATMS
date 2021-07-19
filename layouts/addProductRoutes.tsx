import {StackNavigationState, TypedNavigator} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {StackNavigationEventMap} from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import {AuthProductList} from '../types/ProductRoutes';

export const addProductRoutes = (
  Stack: TypedNavigator<
    AuthProductList,
    StackNavigationState<AuthProductList>,
    StackNavigationOptions,
    StackNavigationEventMap,
    any
  >,
) => {
  return (
    <>
      <Stack.Screen
        name="TrackIn"
        getComponent={() => require('../pages/TrackIn').default}
      />
      <Stack.Screen
        name="TrackOut"
        getComponent={() => require('../pages/TrackOut').default}
      />
    </>
  );
};
