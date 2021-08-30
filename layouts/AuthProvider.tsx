import React, {createContext, useState} from 'react';
import {removeToken, setToken} from '../utils/auth';
import {removeLotId, removeUserInfo} from '../utils/user';
import {NativeBaseProvider} from 'native-base';
import {theme} from '../theme/extendTheme';
type User = null | {userToken: string};

// eslint-disable-next-line no-spaced-func
export const AuthContext = createContext<{
  user: User;
  login: (token: string) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User>(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: (token: string) => {
          setUser({userToken: token});
          setToken(token);
        },
        logout: () => {
          setUser(null);
          removeToken();
          removeLotId();
          removeUserInfo();
        },
      }}>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </AuthContext.Provider>
  );
};
