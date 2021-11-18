import React from 'react';
import {View} from 'react-native';
import {Box} from 'native-base';
import {Item} from '../../components/Item';
import {AuthContext} from '../../layouts/AuthProvider';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {getUniqueId} from 'react-native-device-info';
import LoadingButton from '../../components/LoadingButton';

const Setting: React.FC = () => {
  const {logout} = React.useContext(AuthContext);
  const ipaddress = getUniqueId();
  const navigation = useNavigation();

  const dologOut = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
    logout();
  };

  return (
    <View style={{flex: 1!}}>
      <Box bg="#fff" mt={10}>
        <Item title={`android ID: ${ipaddress}`} iconName="logout" />
        {/* <Item title="sadsadsa" iconName="hourglass" showRightIcon={false} /> */}
      </Box>
      <LoadingButton title="退出登陆" onPress={dologOut} mt={10} />
    </View>
  );
};
export default Setting;
