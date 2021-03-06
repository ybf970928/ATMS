import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function resetNavigate(params?: any) {
  return new Promise<void>(resolve => {
    navigationRef.current?.reset({
      index: 0,
      routes: [{name: 'Home', params: params}],
    });
    resolve();
  });
}
