import React, {useState} from 'react';
import {Box, Button, FormControl, Input, Stack, Text} from 'native-base';

const OnMachineStack: React.FC = ({children}) => {
  return (
    <Stack
      mx={6}
      p={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      {children}
    </Stack>
  );
};
interface FormProps {
  password?: string;
  jieban?: string;
  password2?: string;
}
const Personnel: React.FC = () => {
  const [formValue, setFormValue] = useState<FormProps>({});
  return (
    <Box rounded="lg" width="100%" marginTop={5}>
      <Box bg="white" rounded="lg" width="100%" py={5}>
        <FormControl>
          <OnMachineStack>
            <FormControl.Label>当班人员: </FormControl.Label>
            <Text>1111</Text>
          </OnMachineStack>
          <OnMachineStack>
            <FormControl.Label>密码: </FormControl.Label>
            <Input
              w={'80%'}
              p={1}
              type="password"
              value={formValue.password}
              onChangeText={(value: string) =>
                setFormValue({
                  ...formValue,
                  password: value,
                })
              }
            />
          </OnMachineStack>
          <OnMachineStack>
            <FormControl.Label>接班人员: </FormControl.Label>
            <Input
              w={'80%'}
              p={1}
              value={formValue.jieban}
              onChangeText={(value: string) =>
                setFormValue({
                  ...formValue,
                  jieban: value,
                })
              }
            />
          </OnMachineStack>
          <OnMachineStack>
            <FormControl.Label>密码: </FormControl.Label>
            <Input
              w={'80%'}
              p={1}
              type="password"
              value={formValue.password2}
              onChangeText={(value: string) =>
                setFormValue({
                  ...formValue,
                  password2: value,
                })
              }
            />
          </OnMachineStack>
        </FormControl>
      </Box>
      <Stack
        w={'60%'}
        m="auto"
        p={2}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Button
          onPress={() => {}}
          marginTop={10}
          colorScheme="danger"
          _text={{
            color: 'white',
          }}>
          强制交接
        </Button>
        <Button onPress={() => {}} marginTop={10}>
          确认交接
        </Button>
      </Stack>
    </Box>
  );
};

export default Personnel;
