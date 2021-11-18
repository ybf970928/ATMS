import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputSubmitEditingEventData,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {Box, HStack, Text, Input, useToast, Select} from 'native-base';
import ShowInfoTable from './components/TheInfosTable';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {removeToken} from '../../utils/auth';
import {getLotId, getUserInfo, removeUserInfo} from '../../utils/user';
import {doStop} from '../../services/operationStop';
import {getOEEReason} from '../../services/OEESwitch';
import {useEffect} from 'react';
import {ToastMessage} from '../../utils/errorMessageMap';
import {CommonActions, useNavigation} from '@react-navigation/native';
import LoadingButton from '../../components/LoadingButton';
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
  const navigation = useNavigation();
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
  const [currentLotId, setCurrentLotId] = useState<string>('');
  const [reasonList, setReasonList] = useState<{id: string; name: string}[]>(
    [],
  );

  const {handleSubmit, control} = useForm<DiscontinueForm>();

  const onSubmit: SubmitHandler<DiscontinueForm> = async data => {
    const {eqpid} = await getUserInfo();
    const res = await doStop({
      eqpId: eqpid,
      lotId: currentLotId!,
      boxs: materialBox.join(','),
      ...data,
    });
    if (res.code === 1) {
      await removeToken();
      await removeUserInfo();
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Home',
        }),
      );
    }
    toast.show({
      title: ToastMessage(res),
    });
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
        title: '料盒重复添加',
      });
    }
  };

  useEffect(() => {
    const getCurrentLotId = async () => {
      try {
        const lotId = await getLotId();
        setCurrentLotId(lotId as string);
      } catch (error) {}
    };
    getCurrentLotId();
  }, []);

  useEffect(() => {
    const getReasonList = async () => {
      try {
        const res = await getOEEReason({statusCode: 'CCancelMoveIn'});
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
          <HStack space={3}>
            <Text>作业批号: </Text>
            <Text>{currentLotId}</Text>
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
          <HStack space={3}>
            <Text>料盒信息</Text>
          </HStack>
          <HStack flexWrap="wrap" mt={6}>
            {inputs.map((item, index) => {
              return <View key={index}>{item.render(handleKeyDown)}</View>;
            })}
          </HStack>
        </Box>
        <Box bg="white" maxWidth="100%" marginBottom={5} rounded="lg" p={2}>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={[styles.formItemLayout, styles.itemMT]}>
                  <Text w={'30%'} pl={2} textAlign="left">
                    原因:{' '}
                  </Text>
                  <Select
                    w="70%"
                    selectedValue={value}
                    onValueChange={(itemValue: string) => {
                      onChange(itemValue);
                    }}>
                    {reasonList.map(item => (
                      <Select.Item
                        label={item.name}
                        value={item.id}
                        key={item.id}
                      />
                    ))}
                  </Select>
                </View>
              )}
              name="reason"
            />
          </View>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={styles.formItemLayout}>
                  <Text w={'30%'} pl={2} textAlign="left">
                    备注:{' '}
                  </Text>
                  <Input w="70%" value={value} onChangeText={onChange} />
                </View>
              )}
              name="remark"
            />
          </View>
        </Box>
        <Box bg="white" rounded="lg" width="100%" marginTop={5}>
          <LoadingButton title="确认中止" onPress={handleSubmit(onSubmit)} />
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
});
export default Discontinue;
