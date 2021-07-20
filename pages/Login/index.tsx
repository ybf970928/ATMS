import React, {useState, useContext} from 'react';
import {Center} from '../../layouts/Center';
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
import {SafeAreaView, ScrollView} from 'react-native';
import {codeMessage} from '../../utils/request';
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {login} = useContext(AuthContext);
  const toast = useToast();

  const doLogin = () => {
    setIsLoading(true);
    accountLogin({username, password})
      .then(res => {
        if (res.code === 1) {
          const {token} = res.data;
          login(token);
        }
        setIsLoading(false);
        toast.show({
          title: codeMessage[res.message],
        });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView>
      <ScrollView style={{height: '100%'!}}>
        <Center>
          <Box flex={1} p={2} w="90%" mx="auto">
            <Heading size="lg">Welcome</Heading>
            <Heading color="muted.400" size="xs">
              Sign up to continue!
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
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Login;
