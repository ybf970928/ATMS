import {
  Box,
  Heading,
  Input,
  Select,
  useToast,
  Pressable,
  Text,
} from 'native-base';
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {getOEEReason} from '../../../services/OEESwitch';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import LoadingButton from '../../../components/LoadingButton';
import TableV2 from '../../../components/TableV2';
import {IColProps} from '../../../types/Table';

export interface scrapProps {
  qty: string;
  reason: string;
}
const Scrap: React.FC<{
  type: '次品数量' | '报废数量';
  addScrapped?: (list: scrapProps[]) => void;
  ref: React.ForwardedRef<unknown>;
}> = forwardRef(({type, addScrapped}, ref) => {
  const [scrapSource, setScrapSource] = useState<scrapProps[]>([]);
  const [reasonList, setreasonList] = useState<{id: string; name: string}[]>(
    [],
  );
  const {control, handleSubmit, setValue} = useForm<scrapProps>();
  const toast = useToast();

  // 报废信息
  const scrapColumns: IColProps<scrapProps>[] = [
    {title: type, dataIndex: 'qty'},
    {title: '原因代码', dataIndex: 'reason'},
    {
      title: '操作',
      dataIndex: '',
      render: (field, _handleSubmit, _setValue, $index) => {
        return (
          <Pressable onPress={() => handleDelete($index)}>
            <Text color="blue.500" p={2}>
              删除
            </Text>
          </Pressable>
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

      setScrapSource(prevState => {
        return prevState.concat([
          {
            qty: data.qty,
            reason: findItem?.name as string,
          },
        ]);
      });
      setValue('qty', '');
      setValue('reason', '');

      addScrapped &&
        addScrapped(
          scrapSource.concat([
            {
              qty: data.qty,
              reason: findItem?.name as string,
            },
          ]),
        );
    } else {
      toast.show({
        title: '报废数量和原因代码请填写完整',
      });
    }
  };

  const handleDelete = (index: number) => {
    const newScrapSource = [...scrapSource];
    newScrapSource.splice(index, 1);
    setScrapSource(newScrapSource);
    addScrapped && addScrapped(newScrapSource);
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
                onChangeText={text => {
                  const val = text.replace(/[^0-9]/g, '');
                  onChange(val);
                }}
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
                onValueChange={(itemValue: string) => onChange(itemValue)}
                _selectedItem={{
                  bg: 'info.100',
                }}>
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
          p={4}
          size="sm"
        />
      </Box>
      <TableV2 dataSource={scrapSource} columns={scrapColumns} />
    </Box>
  );
});

export default React.memo(Scrap);
