import {Box, Button, Heading, Input, Select} from 'native-base';
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Table, {TableProps} from '../../../components/Table';
import {getOEEReason} from '../../../services/OEESwitch';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import LoadingButton from '../../../components/LoadingButton';

export interface scrapProps {
  qty: string;
  reason: string;
}
const Scrap: React.FC<{
  type: '次品数量' | '报废数量';
  ref: React.ForwardedRef<unknown>;
}> = forwardRef(({type}, ref) => {
  const [scrapSource, setScrapSource] = useState<scrapProps[]>([]);
  const [reasonList, setreasonList] = useState<{id: string; name: string}[]>(
    [],
  );
  const {control, handleSubmit, setValue} = useForm<scrapProps>();

  // 报废信息
  const scrapColumns: TableProps<scrapProps>[] = [
    {title: type, dataIndex: 'qty'},
    {title: '原因代码', dataIndex: 'reason'},
    {
      title: '操作',
      dataIndex: '',
      render: (text, item, $index) => {
        return (
          <Button
            onPress={() => handleDelete($index)}
            size="sm"
            variant="ghost">
            删除
          </Button>
        );
      },
    },
  ];

  useImperativeHandle(ref, () => ({
    state: scrapSource,
  }));

  const onSubmit: SubmitHandler<scrapProps> = data => {
    if (data.qty && data.reason) {
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
    }
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
    <Box bg="white" rounded="lg" width="100%" marginBottom={5} p={2}>
      <Heading fontSize={16} mb={4}>
        {type}
      </Heading>
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <Box w={200}>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                placeholder={'请输入' + type}
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
                placeholder="请选择原因代码"
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
});

export default React.memo(Scrap);
