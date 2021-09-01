import React from 'react';
import {View} from 'react-native';
import {Box, Button} from 'native-base';
import {Item} from '../../components/Item';
import {AuthContext} from '../../layouts/AuthProvider';
import {CommonActions, useNavigation} from '@react-navigation/native';
const Setting: React.FC = () => {
  const {logout} = React.useContext(AuthContext);
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
        <Item title="dakdnadnkjan" iconName="logout" />
        <Item title="sadsadsa" iconName="hourglass" showRightIcon={false} />
      </Box>
      <Button onPress={dologOut} mt={10}>
        退出登陆
      </Button>
    </View>
  );
};
export default Setting;
