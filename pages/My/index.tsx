import {Box} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Item} from '../../components/Item';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {headerStyle} from '../../layouts/AppTabs';
const Stack = createStackNavigator();
const MyPage: React.FC = () => {
  const navigation = useNavigation();
  const goSetting = () => {
    navigation.navigate('Setting');
  };
  return (
    <View style={styles.content}>
      <View style={styles.userinfo}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.userName}>用户名位置</Text>
        </View>
      </View>
      <Box bg="white" width="100%" mt={4}>
        <Item title="fdnjjdvndfjvdf" iconName={'menu'} />
        <Item title="bgkokfgbfgbnfn" iconName={'hourglass'} />
      </Box>
      <Box bg="white" width="100%" mt={4}>
        <Item title="iodovkkjvdjk" iconName={'import'} showRightIcon={false} />
        <Item title="设置" iconName={'setting'} onPress={goSetting} />
      </Box>
    </View>
  );
};

const My: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My"
        component={MyPage}
        options={{
          headerTitle: '个人中心',
          headerTitleAlign: 'center',
          ...headerStyle,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  userinfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3b82f6',
    zIndex: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    marginRight: 20,
  },
  userName: {
    color: '#fff',
  },
});

export default My;
