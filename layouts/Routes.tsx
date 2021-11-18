import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {navigationRef} from '../utils/RootNavigation';
import {StatusBar} from 'react-native';

export const Routes = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent />
      <AppStack />
    </NavigationContainer>
  );
};
