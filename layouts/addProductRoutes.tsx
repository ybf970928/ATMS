import {StackNavigationState, TypedNavigator} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {StackNavigationEventMap} from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import {AuthProductList} from '../types/ProductRoutes';
import {headerStyle} from './AppTabs';
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
        name="Home"
        getComponent={() => require('./AppTabs').default}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="TrackIn"
        getComponent={() => require('../pages/TrackIn').default}
        options={{
          headerTitle: '开批',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="TrackOut"
        getComponent={() => require('../pages/TrackOut').default}
        options={{
          headerTitle: '结批',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="SaveSummary"
        getComponent={() => require('../pages/SaveSummary').default}
        options={{
          headerTitle: '保存summary',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="Handover"
        getComponent={() => require('../pages/Handover').default}
        options={{
          headerTitle: '产量交接',
          headerTitleAlign: 'center',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="ReplaceScoket"
        getComponent={() => require('../pages/ReplaceScoket').default}
        options={{
          headerTitle: '更换socket',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="OnMachine"
        getComponent={() => require('../pages/OnMachine').default}
        options={{
          headerTitle: '材料上机',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="ScanQRCode"
        getComponent={() => require('../pages/ScanQRCode').default}
        options={{
          headerTitle: '扫描设备条码',
          headerTitleAlign: 'center',
          ...headerStyle,
          cardStyleInterpolator: undefined,
        }}
      />
      <Stack.Screen
        name="CraftCard"
        getComponent={() => require('../pages/CraftCard').default}
        options={{
          headerTitle: '工艺卡片',
          headerTitleAlign: 'center',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="ChangeOEE"
        getComponent={() => require('../pages/ChangeOEE').default}
        options={{
          headerTitle: 'OEE切换',
          headerTitleAlign: 'center',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="Setting"
        getComponent={() => require('../pages/Setting').default}
        options={{
          headerTitle: '设置',
          headerTitleAlign: 'center',
          ...headerStyle,
        }}
      />
    </>
  );
};
