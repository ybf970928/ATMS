import React from 'react';
import {View, Text} from 'native-base';
import {StyleSheet} from 'react-native';
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
            return <IconOutline name="home" size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Message"
        getComponent={() => require('../pages/Message').default}
        options={{
          tabBarLabel: '消息列表',
          tabBarIcon: ({color}) => {
            return (
              <>
                <View style={styles.messageTips}>
                  <View ml={1} rounded="md" style={styles.messageBadge}>
                    <Text style={[styles.badge__content]}>99</Text>
                  </View>
                  <IconOutline name="message" size={30} color={color} />
                </View>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="My"
        getComponent={() => require('../pages/My').default}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color}) => {
            return <IconOutline name="user" size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  messageTips: {
    position: 'relative',
  },
  messageBadge: {
    position: 'absolute',
    top: -4,
    right: -14,
    backgroundColor: '#f56c6c',
    zIndex: 2,
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  badge__content: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
export default AppTabs;
