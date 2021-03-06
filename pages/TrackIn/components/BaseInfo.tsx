import {Box, Spinner, Text} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Center} from '../../../layouts/Center';
import {getLotInfo} from '../../../services/public';
import {getEqpId} from 'utils/user';
interface IFormProps {
  lotId?: string;
  operId?: string;
  eqpId?: string;
  stepID?: string;
  assemblyLotID?: string;
  chipName?: string;
  packageType?: string;
  deviceQty?: string;
  productID?: string;
  materialBoxBarcode?: string;
}
interface IFormItemProps {
  label: string;
  prop: keyof IFormProps;
}

const formItems: IFormItemProps[] = [
  {label: '作业员', prop: 'operId'},
  {label: '机台号', prop: 'eqpId'},
  {label: '工序', prop: 'stepID'},
  {label: '组装批号', prop: 'assemblyLotID'},
  {label: '芯片名', prop: 'chipName'},
  {label: '封装形式', prop: 'packageType'},
  {label: '批次数量', prop: 'deviceQty'},
  {label: '品名', prop: 'productID'},
  {label: '料盒条码信息', prop: 'materialBoxBarcode'},
];

const BaseInfoTrackIn: React.FC<{lotId: string}> = ({lotId}) => {
  const [form, setForm] = useState<IFormProps>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (lotId) {
      setLoading(true);
      const initForm = async () => {
        const eqpId = await getEqpId();
        const res = await getLotInfo({
          eqpId: eqpId,
          lotId: lotId,
          trackInPage: 1,
        });
        setForm(res.data);
        setLoading(false);
      };
      initForm();
    }
  }, [lotId]);

  if (loading) {
    return (
      <Box bg="white" maxWidth="100%" p={2} mt={2} rounded="lg">
        <Center>
          <Spinner color="blue.500" />
        </Center>
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      maxWidth="100%"
      p={2}
      mt={2}
      rounded="lg"
      flexDirection="row"
      flexWrap="wrap">
      {formItems.map(item => {
        return (
          <View style={styles.formItemLayout} key={item.label}>
            <Text minW="20%" pl={2}>
              {item.label}:{' '}
            </Text>
            <Text>{form[item.prop]}</Text>
          </View>
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  formItemLayout: {
    width: '50%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default BaseInfoTrackIn;
