import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {AuthContext} from './AuthProvider';
import {useEffect} from 'react';
import {getToken} from '../utils/auth';
import {AppTabs} from './AppTabs';
import {Center} from './Center';
import {Spinner} from 'native-base';
import {navigationRef} from '../utils/RootNavigation';
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
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
