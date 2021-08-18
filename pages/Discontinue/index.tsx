import React from 'react';
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputSubmitEditingEventData,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {Box, Button, HStack, Text, Input} from 'native-base';
import Table from '../../components/Table';
import {IColProps} from '../../types/Table';
import {useState} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';

interface IDataSource {
  id: string;
  title: string;
  type: string;
  email: string;
  isChecked: number;
  code: string;
}

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
  const {handleSubmit, control} = useForm<DiscontinueForm>();

  const onSubmit: SubmitHandler<DiscontinueForm> = data => {
    console.log(data);
  };
  const [inputs, setinputs] = useState<IInputProps[]>([
    {
      render: eventKeyDown => {
        return (
          <Input
            w={180}
            h={10}
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
  const dataSource: IDataSource[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      type: 'laldal',
      email: 'dasdasdasdsadas',
      isChecked: 1,
      code: 'daasas',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      type: 'dasdsasd',
      email: 'brfdfd2',
      isChecked: 0,
      code: 'adasdas',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      type: 'f232',
      email: 'vb fgerf21',
      isChecked: 0,
      code: '321vfdvdf',
    },
  ];
  const columns: IColProps<IDataSource>[] = [
    {title: '物料类型', dataIndex: 'title'},
    {title: '条码', dataIndex: 'code'},
  ];
  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (e.nativeEvent.text) {
      setinputs(
        inputs.concat([
          {
            render: eventKeyDown => {
              return (
                <Input
                  w={180}
                  h={10}
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
    }
  };
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
            <Text>CL17DYE-1</Text>
          </HStack>
        </Box>
        <Table dataSource={dataSource} columns={columns} />
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
                  <Input w="70%" value={value} onChangeText={onChange} />
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
              name="reason"
            />
          </View>
        </Box>
        <Box bg="white" rounded="lg" width="100%" marginTop={5}>
          <Button onPress={handleSubmit(onSubmit)}>确认中止</Button>
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
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemMT: {
    marginBottom: 10,
  },
});
export default Discontinue;
