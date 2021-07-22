import {useNavigation} from '@react-navigation/native';
import {Box, Button, Center, Heading, Stack} from 'native-base';
import React from 'react';

interface IAlertProps {
  formRoute: string;
  Keyword: string;
}
const ValidateAlert: React.FC<IAlertProps> = ({formRoute, Keyword}) => {
  const navigation = useNavigation();
  return (
    <Center flex={1}>
      <Box
        bg="white"
        rounded="lg"
        m="auto"
        w={'80%'}
        alignContent="center"
        justifyContent="center">
        <Stack space={4} p={[4, 4, 8]}>
          <Heading size="md" noOfLines={2}>
            需要扫描分选机编号
          </Heading>
        </Stack>
        <Box
          flexDirection="row"
          w={'100%'}
          justifyContent="flex-end"
          p={[2, 4, 4]}>
          <Button onPress={() => navigation.goBack()}>取消</Button>
          <Button
            colorScheme="red"
            _text={{
              color: 'white',
            }}
            onPress={() =>
              navigation.navigate('ScanQRCode', {
                formRoute: formRoute,
                Keyword: Keyword,
              })
            }
            ml={3}>
            去扫描
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default ValidateAlert;
