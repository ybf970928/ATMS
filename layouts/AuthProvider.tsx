import React, {createContext, useState} from 'react';
import {removeToken, setToken} from '../utils/auth';
import {removeLotId, removeUserInfo} from '../utils/user';
import {NativeBaseProvider} from 'native-base';
import {theme} from '../theme/extendTheme';
import Login from '../pages/Login/index1';

interface ContextProps {
  loginPopup: boolean;
  openLoginPopup: (isOpen: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<ContextProps>({
  loginPopup: false,
  openLoginPopup: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({children}) => {
  const [showloginPopup, setShowloginPopup] = useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{
        loginPopup: showloginPopup,
        openLoginPopup: (isOpen: boolean) => {
          setShowloginPopup(isOpen);
        },
        login: (token: string) => {
          setToken(token);
          setShowloginPopup(false);
        },
        logout: () => {
          removeToken();
          removeLotId();
          removeUserInfo();
        },
      }}>
      <NativeBaseProvider theme={theme}>
        {children}
        <Login
          isShow={showloginPopup}
          needLogin={(show: boolean) => setShowloginPopup(show)}
        />
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
};
