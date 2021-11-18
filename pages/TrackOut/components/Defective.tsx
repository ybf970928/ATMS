import {Box, Button, Heading, Input, Select} from 'native-base';
import React, {useState, useEffect} from 'react';
import Table, {TableProps} from '../../../components/Table';
import {getOEEReason} from '../../../services/OEESwitch';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import LoadingButton from '../../../components/LoadingButton';

interface scrapProps {
  qty: string;
  reason: string;
}
const Defective: React.FC = () => {
  const [scrapSource, setScrapSource] = useState<scrapProps[]>([]);
  const [reasonList, setreasonList] = useState<{id: string; name: string}[]>(
    [],
  );
  const {control, handleSubmit, setValue} = useForm<scrapProps>();

  // 报废信息
  const scrapColumns: TableProps<scrapProps>[] = [
    {title: '报废数量', dataIndex: 'qty'},
    {title: '原因代码', dataIndex: 'reason'},
    {
      title: '操作',
      dataIndex: '',
      render: (text, item, $index) => {
        return (
          <Button onPress={() => handleDelete($index)} w={50} size="xs">
            删除
          </Button>
        );
      },
    },
  ];
  const onSubmit: SubmitHandler<scrapProps> = data => {
    const findItem = reasonList.find(item => item.id === data.reason);
    // 需要展示的是name
    setScrapSource(
      scrapSource.concat([
        {
          qty: data.qty,
          reason: findItem?.name as string,
        },
      ]),
    );
    setValue('qty', '');
    setValue('reason', '');
  };

  const handleDelete = (index: number) => {
    const newScrapSource = [...scrapSource];
    newScrapSource.splice(index, 1);
    setScrapSource(newScrapSource);
  };

  useEffect(() => {
    const getReasonList = async () => {
      const res = await getOEEReason({statusCode: 'CCancelMoveIn'});
      setreasonList(res.data);
    };
    getReasonList();
    return () => {
      setreasonList([]);
    };
  }, []);

  return (
    <Box bg="white" rounded="lg" width="100%" marginTop={5} p={2}>
      <Heading fontSize={16}>废次品信息</Heading>
      <Box flexDirection="row">
        <Box w={200}>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                // h={10}
                onChangeText={val => onChange(val)}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="qty"
          />
        </Box>
        <Box w={200} ml={6}>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Select
                // h={10}
                selectedValue={value}
                onValueChange={(itemValue: string) => onChange(itemValue)}>
                {reasonList.map(v => {
                  return <Select.Item label={v.name} value={v.id} key={v.id} />;
                })}
              </Select>
            )}
            name="reason"
          />
        </Box>
        <LoadingButton
          title="新增"
          onPress={handleSubmit(onSubmit)}
          w={100}
          ml={6}
          size="sm"
        />
      </Box>
      <Table dataSource={scrapSource} columns={scrapColumns} />
    </Box>
  );
};

export default Defective;
