import {Box, Input, Switch, Select, useToast} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {MateriaProps} from '../index';
import {IColProps} from '../../../types/Table';
import {getEqpId} from 'utils/user';
import {doUpdate} from '../../../services/materials';
import {ToastMessage} from '../../../utils/errorMessageMap';
import LoadingButton from '../../../components/LoadingButton';
type MaterialType = {
  dataSource: MateriaProps[];
  stepId: string;
  lotId: string;
};
const columns: IColProps<MateriaProps>[] = [
  {title: '材料类型', dataIndex: 'materialType'},
  {
    title: '条码',
    dataIndex: 'materialBarCode',
  },
  {title: '键合头', dataIndex: 'bondingHead'},
  {
    title: '是否勾选',
    dataIndex: 'checked',
  },
  {
    title: '操作',
    dataIndex: 'materialBarCode',
  },
];

interface RowProps {
  item: MateriaProps;
  stepId: string;
  lotId: string;
}
const Row: React.FC<RowProps> = ({
  item: {checked, materialType, materialBarCode, bondingHead},
  stepId,
  lotId,
}) => {
  const [isCheck, setCheck] = useState<boolean>(false);
  const toast = useToast();
  const {handleSubmit, control} = useForm<MateriaProps>({
    defaultValues: {
      checked,
      materialType,
      materialBarCode,
      bondingHead,
    },
  });
  const onSubmit: SubmitHandler<MateriaProps> = async data => {
    if (data.materialBarCode && data.bondingHead) {
      const eqpId = await getEqpId();
      const res = await doUpdate({
        cType: data.materialType,
        lotId: lotId,
        eqpId: eqpId,
        stepId,
        barCode: data.materialBarCode,
        bondingHead: data.bondingHead,
        oldBarCode: materialBarCode,
        check: data.checked ? 1 : 0,
      });
      if (res.code === 1) {
        setCheck(!isCheck);
      }
      toast.show({
        title: ToastMessage(res),
      });
    } else {
      toast.show({
        title: '信息请填写完整',
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
      <View style={[styles.barCode]}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input value={value} onChangeText={onChange} isDisabled={isCheck} />
          )}
          name="materialBarCode"
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Select
              isDisabled={isCheck}
              selectedValue={value.toString()}
              onValueChange={(itemValue: string) => {
                onChange(itemValue);
              }}
              _selectedItem={{
                bg: 'info.100',
              }}>
              <Select.Item label="1" value="1" />
              <Select.Item label="2" value="2" />
            </Select>
          )}
          name="bondingHead"
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.checkedView}>
              <Switch
                onToggle={onChange}
                isChecked={value ? true : false}
                onTrackColor="blue.500"
                isDisabled={isCheck}
              />
            </View>
          )}
          name="checked"
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

const EditableRow: React.FC<MaterialType> = ({dataSource, stepId, lotId}) => {
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
              style={index === 1 ? styles.barCodeTitle : styles.row}
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
  checkedView: {
    width: '70%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  submitBtn: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  barCodeTitle: {
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  barCode: {
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
export default EditableRow;
