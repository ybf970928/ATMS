import React from 'react';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconOutline} from '@ant-design/icons-react-native';
import {AppParamList} from './AppParamList';

export const headerStyle: StackNavigationOptions = {
  headerTitleStyle: {color: '#fff'},
  headerStyle: {
    backgroundColor: '#3b82f6',
  },
  headerTintColor: '#fff', //Tint color for the header 箭头颜色啥的
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
const AppTabs = () => {
  const Tab = createBottomTabNavigator<AppParamList>();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        getComponent={() => require('../pages/Home').default}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({color}) => {
            return <IconOutline name="home" size={26} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Message"
        getComponent={() => require('../pages/Message').default}
        options={{
          tabBarLabel: '消息列表',
          tabBarIcon: ({color}) => {
            return <IconOutline name="message" size={26} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="My"
        getComponent={() => require('../pages/My').default}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color}) => {
            return <IconOutline name="user" size={26} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
