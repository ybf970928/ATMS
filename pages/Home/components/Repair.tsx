import React from 'react';
import {Button} from 'react-native';
import {AuthContext} from '../../../layouts/AuthProvider';
const Repair: React.FC = () => {
  const {logout} = React.useContext(AuthContext);
  return <Button title={'退出登陆'} onPress={logout} />;
};

export default Repair;
