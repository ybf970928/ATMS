import React, {createContext, useState, useCallback} from 'react';
import {removeToken, setToken} from 'utils/auth';
import {removeUserInfo} from 'utils/user';
import {NativeBaseProvider} from 'native-base';
import {theme} from '../theme/extendTheme';
import Login from '../pages/Login';
import UpdateModel from '../components/updateModel';
import {LotInfoType} from 'types/lotinfo';
interface ContextProps {
  loginPopup: boolean;
  openLoginPopup: (isOpen: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
  lotForm: LotInfoType;
  setLotInfo: (info: LotInfoType) => void;
}

export const AuthContext = createContext<ContextProps>({
  loginPopup: false,
  openLoginPopup: () => {},
  login: () => {},
  logout: () => {},
  lotForm: {},
  setLotInfo: () => {},
});

export const AuthProvider: React.FC = ({children}) => {
  const [showloginPopup, setShowloginPopup] = useState<boolean>(false);
  const [lotForm, setLotForm] = useState<LotInfoType>({});

  const handleSetLotForm = useCallback((info: LotInfoType) => {
    setLotForm(info);
  }, []);

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
          removeUserInfo();
        },
        lotForm,
        setLotInfo: handleSetLotForm,
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
