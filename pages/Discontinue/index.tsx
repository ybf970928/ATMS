import React, {useState, useContext, useEffect} from 'react';
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputSubmitEditingEventData,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  Box,
  HStack,
  Text,
  Input,
  useToast,
  Select,
  VStack,
  FormControl,
  TextArea,
} from 'native-base';
import ShowInfoTable from './components/TheInfosTable';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {getEqpId} from 'utils/user';
import {doStop} from 'services/operationStop';
import {getOperationStop} from 'services/OEESwitch';
import {ToastMessage} from 'utils/errorMessageMap';
import LoadingButton from 'components/LoadingButton';
import {AuthContext} from '../../layouts/AuthProvider';
interface IInputProps {
  render: (
    eventKeyDown: (
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    ) => void,
  ) => JSX.Element;
}

interface DiscontinueForm {
  reason: string;
  remark: string;
}

const Discontinue: React.FC = () => {
  const toast = useToast();
  const [inputs, setinputs] = useState<IInputProps[]>([
    {
      render: eventKeyDown => {
        return (
          <Input
            w={180}
            onSubmitEditing={eventKeyDown}
            multiline={true}
            blurOnSubmit={true}
            mr={2}
            mb={2}
          />
        );
      },
    },
  ]);

  const [materialBox, setMaterialBox] = useState<string[]>([]);
  const [reasonList, setReasonList] = useState<{id: string; name: string}[]>(
    [],
  );
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const {lotForm} = useContext(AuthContext);
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<DiscontinueForm>();

  const onSubmit: SubmitHandler<DiscontinueForm> = async data => {
    if (materialBox.length) {
      const eqpId = await getEqpId();
      const res = await doStop({
        eqpId,
        lotId: lotForm.lotId!,
        boxs: materialBox.join(','),
        ...data,
      });
      if (res.code === 1) {
        setDisabled(true);
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: 'Home'}],
        //   }),
        // );
      } else {
        setDisabled(false);
      }
      toast.show({
        title: ToastMessage(res),
      });
    } else {
      setDisabled(false);
      toast.show({
        title: '??????????????????????????????',
      });
    }
  };
  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (e.nativeEvent.text && !materialBox.includes(e.nativeEvent.text)) {
      setMaterialBox(materialBox.concat(e.nativeEvent.text));
      setinputs(
        inputs.concat([
          {
            render: eventKeyDown => {
              return (
                <Input
                  w={180}
                  onSubmitEditing={eventKeyDown}
                  multiline={true}
                  blurOnSubmit={true}
                  autoFocus
                  mr={2}
                  mb={2}
                />
              );
            },
          },
        ]),
      );
    } else if (e.nativeEvent.text && materialBox.includes(e.nativeEvent.text)) {
      toast.show({
        title: '??????????????????',
      });
    }
  };

  useEffect(() => {
    const getReasonList = async () => {
      try {
        const res = await getOperationStop();
        setReasonList(Array.isArray(res.data) ? res.data : []);
      } catch (error) {}
    };
    getReasonList();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <Box
          bg="white"
          rounded="lg"
          width="100%"
          marginTop={5}
          marginBottom={5}
          p={2}>
          <HStack space={3} p={2}>
            <Text>????????????: </Text>
            <Text>{lotForm.lotId}</Text>
          </HStack>
        </Box>
        <ShowInfoTable />
        <Box
          bg="white"
          rounded="lg"
          width="100%"
          marginTop={5}
          marginBottom={5}
          p={2}>
          <HStack>
            <Text fontSize={16} color="blue.500">
              ????????????
            </Text>
            <Text fontSize={16} color="red.600" pl={1}>
              *
            </Text>
          </HStack>
          <HStack flexWrap="wrap" mt={6}>
            {inputs.map((item, index) => {
              return <View key={index}>{item.render(handleKeyDown)}</View>;
            })}
          </HStack>
        </Box>
        <Box bg="white" maxWidth="100%" marginBottom={5} rounded="lg" p={2}>
          <VStack width="100%" space={4} alignItems="center" mb={2}>
            <FormControl isRequired isInvalid={'reason' in errors}>
              <FormControl.Label>??????: </FormControl.Label>
              <Controller
                control={control}
                rules={{required: '???????????????'}}
                render={({field: {onChange, value}}) => (
                  <Select
                    w="100%"
                    selectedValue={value}
                    onValueChange={(itemValue: string) => {
                      onChange(itemValue);
                    }}
                    _selectedItem={{
                      bg: 'info.100',
                    }}>
                    {reasonList.map(item => (
                      <Select.Item
                        mt={1}
                        label={item.name}
                        value={item.id}
                        key={item.id}
                      />
                    ))}
                  </Select>
                )}
                name="reason"
              />
              <FormControl.ErrorMessage>
                {errors.reason?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <VStack width="100%" space={4} alignItems="center">
            <FormControl>
              <FormControl.Label>??????: </FormControl.Label>
              <Controller
                control={control}
                rules={{maxLength: 200}}
                render={({field: {onChange, value}}) => (
                  <TextArea
                    w="100%"
                    value={value}
                    onChangeText={onChange}
                    InputRightElement={
                      <View style={styles.textArea}>
                        <Text color="muted.300">{`${
                          value ? value.length : 0
                        }/200`}</Text>
                      </View>
                    }
                  />
                )}
                name="remark"
              />
            </FormControl>
          </VStack>
        </Box>
        <Box bg="white" rounded="lg" width="100%" marginBottom={5}>
          <LoadingButton
            title="????????????"
            onPress={handleSubmit(onSubmit)}
            isDisabled={isDisabled}
          />
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
  formItemLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemMT: {
    marginBottom: 10,
  },
  textArea: {
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
});
export default Discontinue;
