import React, {createContext, useState} from 'react';
import {removeToken, setToken} from '../utils/auth';
type User = null | {userToken: string};

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
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
