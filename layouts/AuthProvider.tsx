import React, {createContext, useState} from 'react';
import {removeToken, setToken} from '../utils/auth';
import {removeLotId, removeUserInfo} from '../utils/user';
import {NativeBaseProvider, extendTheme} from 'native-base';

type User = null | {userToken: string};

// eslint-disable-next-line no-spaced-func
export const AuthContext = createContext<{
  user: User;
  login: (token: string) => void;
  logout: () => void;
  trackInCode: (code: string) => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  trackInCode: () => {},
});

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User>(null);
  const theme = extendTheme({
    components: {
      Button: {
        // Can simply pass default props to change default behaviour of components.
        baseStyle: {
          rounded: 'md',
        },
        defaultProps: {
          colorScheme: 'blue',
        },
      },
      Heading: {
        // Can pass also function, giving you access theming tools
        baseStyle: ({colorMode}) => {
          return {
            color: colorMode === 'dark' ? 'blue.500' : 'blue.500',
            fontWeight: 'normal',
          };
        },
      },
      Input: {
        baseStyle: {
          _android: {
            _focus: {
              borderColor: 'blue.500',
            },
          },
          _ios: {
            _focus: {
              borderColor: 'blue.500',
            },
          },
        },
        defaultProps: {
          size: 'xs',
        },
      },
      Select: {
        sizes: 'xs',
      },
    },
  });
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
        trackInCode: (code: string) => {
          console.log(code);
        },
      }}>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </AuthContext.Provider>
  );
};
