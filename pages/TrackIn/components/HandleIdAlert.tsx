import React from 'react';
import {Button, Box, Stack, Heading, Center} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const HandleIdAlert: React.FC = () => {
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
                formRoute: 'TrackIn',
                Keyword: 'handleId',
              })
            }
            ml={3}>
            去扫描
          </Button>
        </Box>
      </Box>
    </Center>
    // <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen}>
    //   <AlertDialog.Content>
    //     <AlertDialog.Body>需要扫描分选机编号</AlertDialog.Body>
    //     <AlertDialog.Footer>
    //       <Button ref={cancelRef} onPress={() => navigation.goBack()}>
    //         取消
    //       </Button>
    //       <Button
    //         colorScheme="red"
    //         _text={{
    //           color: 'white',
    //         }}
    //         onPress={() =>
    //           navigation.navigate('ScanQRCode', {
    //             formRoute: 'Handover',
    //             Keyword: 'handleId',
    //           })
    //         }
    //         ml={3}>
    //         去扫描
    //       </Button>
    //     </AlertDialog.Footer>
    //   </AlertDialog.Content>
    // </AlertDialog>
  );
};

export default HandleIdAlert;
