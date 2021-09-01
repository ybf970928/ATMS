import React, {useContext, useState} from 'react';
import {VStack, FormControl, Input, Button, Modal, useToast} from 'native-base';
import {getUniqueId} from 'react-native-device-info';
import {accountLogin} from '../../services/login';
import {ToastMessage} from '../../utils/errorMessageMap';
import {AuthContext} from '../../layouts/AuthProvider';
import {setUserInfo} from '../../utils/user';

interface loginPopupProps {
  isShow: boolean;
  needLogin: (show: boolean) => void;
}

const Login: React.FC<loginPopupProps> = ({isShow, needLogin}) => {
  // const [showModal, setShowModal] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('123456');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const {login} = useContext(AuthContext);

  const doLogin = async () => {
    setIsLoading(true);
    try {
      // 使用ipaddress替代androd id
      const ipaddress = getUniqueId();
      const res = await accountLogin({
        username,
        password,
        ipaddress,
        loginType: 3,
      });
      if (res.code === 1) {
        const {token} = res.data;
        setUserInfo(res.data).then(() => {
          setIsLoading(false);
          login(token);
        });
      } else {
        setIsLoading(false);
      }
      toast.show({
        title: ToastMessage(res),
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isShow} onClose={() => needLogin(!isShow)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Body>
          <VStack space={2} mt={5}>
            <FormControl>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                用户名
              </FormControl.Label>
              <Input
                value={username}
                onChangeText={(value: string) => setUsername(value)}
              />
            </FormControl>
            <FormControl mb={5}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                密码
              </FormControl.Label>
              <Input
                type="password"
                value={password}
                onChangeText={(value: string) => setPassword(value)}
              />
            </FormControl>
            <VStack space={2}>
              <Button isLoading={isLoading} onPress={doLogin}>
                登陆
              </Button>
            </VStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default Login;
