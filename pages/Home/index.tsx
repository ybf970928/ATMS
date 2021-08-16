import React from 'react';
import {UIManager, Platform, ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {headerStyle} from '../../layouts/AppTabs';
import MoreFeatures from './components/MoreFeatures';
import UserCard from './components/UserCard';
import MessageBox from './components/MessageBox';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const HomePage: React.FC = () => {
  return (
    <ScrollView style={{flex: 1!}}>
      <UserCard />
      <MessageBox />
      <MoreFeatures />
    </ScrollView>
  );
};

const Home: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My"
        component={HomePage}
        options={{
          headerTitle: 'ATMS',
          headerTitleAlign: 'left',
          ...headerStyle,
        }}
      />
    </Stack.Navigator>
  );
};

export default Home;
