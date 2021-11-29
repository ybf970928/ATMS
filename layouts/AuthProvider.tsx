import React, {createContext, useState} from 'react';
import {removeToken, setToken} from '../utils/auth';
import {removeUserInfo} from '../utils/user';
import {NativeBaseProvider} from 'native-base';
import {theme} from '../theme/extendTheme';
// 旧的先不删, 待定
import Login from '../pages/Login';
import UpdateModel from '../components/updateModel';
interface ContextProps {
  isTrackOut: boolean;
  loginPopup: boolean;
  openLoginPopup: (isOpen: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
  checkTrackOut: (TrackOut: boolean) => void;
}

export const AuthContext = createContext<ContextProps>({
  isTrackOut: false,
  loginPopup: false,
  openLoginPopup: () => {},
  login: () => {},
  logout: () => {},
  checkTrackOut: () => {},
});

export const AuthProvider: React.FC = ({children}) => {
  const [showloginPopup, setShowloginPopup] = useState<boolean>(false);
  const [isTrackOut, setisTrackOut] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        isTrackOut,
        checkTrackOut: (TrackOut: boolean) => {
          setisTrackOut(TrackOut);
        },
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
          removeUserInfo();
        },
      }}>
      <NativeBaseProvider theme={theme}>
        {children}
        <Login
          isShow={showloginPopup}
          needLogin={(show: boolean) => setShowloginPopup(show)}
        />
        <UpdateModel />
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
};
