import React, {useState} from 'react';
import {VStack, FormControl, Input, Button, Modal, useToast} from 'native-base';
import {getUniqueId} from 'react-native-device-info';
import {accountLogin} from '../../services/login';
import {ToastMessage} from '../../utils/errorMessageMap';
interface LoginProps {
  handlerLogin: (data: any) => void;
}

const Login: React.FC<LoginProps> = ({handlerLogin}) => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

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
        setIsLoading(false);
        handlerLogin(res.data);
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
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
