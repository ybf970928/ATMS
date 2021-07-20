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
        options={{
          headerTitle: '开批',
        }}
      />
      <Stack.Screen
        name="TrackOut"
        getComponent={() => require('../pages/TrackOut').default}
        options={{
          headerTitle: '结批',
        }}
      />
      <Stack.Screen
        name="SaveSummary"
        getComponent={() => require('../pages/SaveSummary').default}
        options={{
          headerTitle: '保存summary',
        }}
      />
      <Stack.Screen
        name="Handover"
        getComponent={() => require('../pages/Handover').default}
        options={{
          headerTitle: '交接班',
        }}
      />
      <Stack.Screen
        name="ReplaceScoket"
        getComponent={() => require('../pages/ReplaceScoket').default}
        options={{
          headerTitle: '更换socket',
        }}
      />
      <Stack.Screen
        name="OnMachine"
        getComponent={() => require('../pages/OnMachine').default}
        options={{
          headerTitle: '材料上机',
        }}
      />
      <Stack.Screen
        name="ScanQRCode"
        getComponent={() => require('../pages/ScanQRCode').default}
        options={{
          headerTitle: '扫描二维码',
          headerTitleAlign: 'center',
        }}
      />
    </>
  );
};
