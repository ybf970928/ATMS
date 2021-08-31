import React, {createContext, useState} from 'react';
import {removeToken, setToken} from '../utils/auth';
import {removeLotId, removeUserInfo} from '../utils/user';
import {NativeBaseProvider} from 'native-base';
import {theme} from '../theme/extendTheme';

// eslint-disable-next-line no-spaced-func
export const AuthContext = createContext<{
  user: string;
  login: (token: string) => void;
  logout: () => void;
}>({
  user: '',
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({children}) => {
  const [loginUser, setLoginUser] = useState<string>('');
  return (
    <AuthContext.Provider
      value={{
        user: loginUser,
        login: (token: string) => {
          console.log('token:', token);
          setLoginUser(token);
          setToken(token);
        },
        logout: () => {
          setLoginUser('');
          removeToken();
          removeLotId();
          removeUserInfo();
        },
      }}>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </AuthContext.Provider>
  );
};
