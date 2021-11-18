import {Box} from 'native-base';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Item} from '../../components/Item';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {headerStyle} from '../../layouts/AppTabs';
import {getUserInfo} from '../../utils/user';

const BASE_API = 'http://10.100.101.22:8100/';

interface UserInfoProps {
  userName?: string;
  avatar?: string;
}

const Stack = createStackNavigator();
const MyPage: React.FC = () => {
  const navigation = useNavigation();
  const [currentUser, setUser] = useState<UserInfoProps>({});
  const goSetting = () => {
    navigation.navigate('Setting');
  };

  useEffect(() => {
    const getUserName = async () => {
      try {
        const {user} = await getUserInfo();
        setUser({
          avatar: user.avatar,
          userName: user.userName,
        });
      } catch (error) {
        console.log('获取用户信息失败');
      }
    };
    getUserName();
  }, []);

  return (
    <View style={styles.content}>
      <View style={styles.userinfo}>
        <ImageBackground
          source={{uri: BASE_API + currentUser.avatar}}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>
            {currentUser.userName || '暂未登陆'}
          </Text>
        </View>
      </View>
      {/* <Box bg="white" width="100%">
        <Item title="fdnjjdvndfjvdf" iconName={'menu'} />
        <Item title="bgkokfgbfgbnfn" iconName={'hourglass'} />
      </Box> */}
      <Box bg="white" width="100%" mt={4}>
        {/* <Item title="iodovkkjvdjk" iconName={'import'} showRightIcon={false} /> */}
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
    // backgroundColor: '#3b82f6',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    resizeMode: 'cover',
  },
  userName: {
    color: '#333',
  },
});

export default My;
