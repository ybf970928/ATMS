import {Box, Input, useToast} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {MaterialBoxProps} from '../index';
import {IColProps} from '../../../types/Table';
import {getEqpId} from '../../../utils/user';
import {doUpdate} from '../../../services/materials';
import {ToastMessage} from '../../../utils/errorMessageMap';
import LoadingButton from '../../../components/LoadingButton';
type MaterialType = {
  dataSource: MaterialBoxProps[];
  stepId: string;
  lotId: string;
};
const columns: IColProps<MaterialBoxProps>[] = [
  {title: '材料类型', dataIndex: 'materialType'},
  {title: '条码', dataIndex: 'materialBarCode'},
  {title: '操作', dataIndex: ''},
];

interface RowProps {
  item: MaterialBoxProps;
  stepId: string;
  lotId: string;
}
const Row: React.FC<RowProps> = ({
  item: {materialBarCode, materialType},
  stepId,
  lotId,
}) => {
  const [isCheck, setCheck] = useState<boolean>(false);
  const {handleSubmit, control} = useForm<MaterialBoxProps>({
    defaultValues: {
      materialBarCode,
      materialType,
    },
  });
  const toast = useToast();

  const onSubmit: SubmitHandler<MaterialBoxProps> = async data => {
    const eqpId = await getEqpId();
    const res = await doUpdate({
      cType: data.materialType,
      lotId: lotId,
      eqpId: eqpId,
      stepId,
      barCode: data.materialBarCode || '',
      oldBarCode: materialBarCode || '',
    });
    if (res.code === 1) {
      setCheck(!isCheck);
    } else {
      toast.show({
        title: ToastMessage(res),
      });
    }
  };
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input value={value} onChangeText={onChange} isDisabled />
          )}
          name="materialType"
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input value={value} onChangeText={onChange} isDisabled={isCheck} />
          )}
          name="materialBarCode"
        />
      </View>
      <View style={[styles.row, styles.submitBtn]}>
        <LoadingButton
          title={isCheck ? '已确认' : '确认新增'}
          onPress={handleSubmit(onSubmit)}
          size="sm"
          isDisabled={isCheck}
          colorScheme={'blue'}
        />
      </View>
    </View>
  );
};

const MaterialBox: React.FC<MaterialType> = ({dataSource, stepId, lotId}) => {
  return (
    <Box
      bg="white"
      rounded="lg"
      width="100%"
      marginBottom={6}
      flexDirection="row"
      flexWrap="wrap">
      <View style={styles.tableHeader}>
        {columns.map((col, index) => {
          return (
            <Text
              style={styles.row}
              key={(col.dataIndex as string) + '' + index}>
              {col.title}
            </Text>
          );
        })}
      </View>
      {dataSource.map((item, index) => {
        return <Row item={item} lotId={lotId} key={index} stepId={stepId} />;
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  table: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  row: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tableHeader: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  submitBtn: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
export default MaterialBox;
