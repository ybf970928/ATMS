import React from 'react';
import {AuthProvider} from './AuthProvider';
import {Routes} from './Routes';
export const Providers: React.FC = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
