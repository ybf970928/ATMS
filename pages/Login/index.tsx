import React, {useState, useContext} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  useToast,
} from 'native-base';
import {accountLogin} from '../../services/login';
import {AuthContext} from '../../layouts/AuthProvider';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
} from 'react-native';
import {codeMessage} from '../../utils/request';
import {getMacAddress} from 'react-native-device-info';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {login} = useContext(AuthContext);
  const toast = useToast();

  const doLogin = async () => {
    setIsLoading(true);
    try {
      const macAdress = await getMacAddress();
      const res = await accountLogin({username, password, macAdress});
      if (res.code === 1) {
        const {token} = res.data;
        setIsLoading(false);
        login(token);
      } else {
        setIsLoading(false);
      }
      toast.show({
        title: codeMessage[res.message],
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={{height: '100%'!}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            style={styles.image}
            source={require('./img/login_bg.jpg')}>
            <Image
              source={require('./img/semi-logo.png')}
              style={styles.logo}
            />
            <Box p={2} w="35%" bg="#fff" rounded="lg" mr={10}>
              <Heading size="md">Welcome</Heading>
              <Heading color="muted.400" size="xs">
                欢迎使用赛美特智能制造系统
              </Heading>
              <VStack space={2} mt={5}>
                <FormControl>
                  <FormControl.Label
                    _text={{
                      color: 'muted.700',
                      fontSize: 'sm',
                      fontWeight: 600,
                    }}>
                    用户名
                  </FormControl.Label>
                  <Input
                    p={1}
                    value={username}
                    onChangeText={(value: string) => setUsername(value)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label
                    _text={{
                      color: 'muted.700',
                      fontSize: 'sm',
                      fontWeight: 600,
                    }}>
                    密码
                  </FormControl.Label>
                  <Input
                    p={1}
                    type="password"
                    value={password}
                    onChangeText={(value: string) => setPassword(value)}
                  />
                </FormControl>
                <VStack space={2} mt={5}>
                  <Button
                    // colorScheme="cyan"
                    _text={{color: 'white'}}
                    isLoading={isLoading}
                    onPress={doLogin}>
                    登录
                  </Button>
                </VStack>
              </VStack>
            </Box>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 171,
    height: 108,
    marginBottom: 300,
  },
});
export default Login;
