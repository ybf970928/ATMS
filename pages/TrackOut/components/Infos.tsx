import React, {useState} from 'react';
import {Box, Heading, Button, HStack, Input} from 'native-base';
import {View} from 'react-native';
import Table from '../../../components/Table';
import {IColProps} from '../../../types/Table';
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
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
  {title: '材料信息', dataIndex: 'title'},
  {title: '材料代码', dataIndex: 'code'},
  {title: '物料描述', dataIndex: 'code'},
  {title: '供应商代码', dataIndex: 'code'},
  {title: '供应商', dataIndex: 'code'},
  {title: '批号', dataIndex: 'code'},
  {title: '有效期', dataIndex: 'code'},
  {title: '序列号', dataIndex: 'code'},
];
const Infos = () => {
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
    <>
      <Box
        bg="white"
        rounded="lg"
        width="100%"
        marginTop={5}
        marginBottom={5}
        p={2}>
        <Heading fontSize={16}>材料信息</Heading>
        <Table dataSource={dataSource} columns={columns} />
      </Box>
      <Box bg="white" rounded="lg" width="100%" marginBottom={5} p={2}>
        <Heading fontSize={16}>耗材信息</Heading>
        <Table dataSource={dataSource} columns={columns} />
      </Box>
      <Box bg="white" rounded="lg" width="100%" marginBottom={5} p={2}>
        <Heading fontSize={16}>料盒信息</Heading>
        <HStack flexWrap="wrap" mt={6}>
          {inputs.map((item, index) => {
            return <View key={index}>{item.render(handleKeyDown)}</View>;
          })}
        </HStack>
      </Box>
      <Box bg="white" rounded="lg" width="100%" marginBottom={5} p={2}>
        <Heading fontSize={16}>废次品信息</Heading>
      </Box>
      <Box width="100%" marginBottom={5} p={2}>
        <Button onPress={() => {}}>确认出机</Button>
      </Box>
    </>
  );
};

export default Infos;
