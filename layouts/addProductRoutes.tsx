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
        name="MaterialChange"
        getComponent={() => require('../pages/MaterialChange').default}
        options={{
          headerTitle: '物料更换与对比',
          headerTitleAlign: 'center',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="MaterialsHistory"
        getComponent={() =>
          require('../pages/MaterialChange/components/MaterialsHistory').default
        }
        options={{
          headerTitle: '物料历史记录',
          headerTitleAlign: 'center',
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="Discontinue"
        getComponent={() => require('../pages/Discontinue').default}
        options={{
          headerTitle: '作业中止',
          headerTitleAlign: 'center',
          ...headerStyle,
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
        name="Handover"
        getComponent={() => require('../pages/Handover').default}
        options={{
          headerTitle: '产量交接',
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
