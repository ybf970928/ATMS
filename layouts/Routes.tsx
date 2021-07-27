import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {AuthContext} from './AuthProvider';
import {useEffect} from 'react';
import {getToken} from '../utils/auth';
// import {AppTabs} from './AppTabs';
import {AppStack} from './AppStack';
import {Center} from './Center';
// react native ActivityIndicator组件 在华为pad无法运行😅😅😅😅
import {Spinner} from 'native-base';
import {navigationRef} from '../utils/RootNavigation';
import {StatusBar} from 'react-native';

export const Routes = () => {
  const {user, login} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken()
      .then(userToken => {
        if (userToken) {
          // decode it
          login(userToken);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Center>
        <Spinner color="blue.500" />
      </Center>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent />
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
