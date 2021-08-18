import {Box, Text} from 'native-base';
import React from 'react';
import {View, StyleSheet} from 'react-native';
interface IFormProps {
  user: string;
  eqpId: string;
  pihao: string;
  gongxu: string;
  zuzhuang: string;
  xinpian: string;
  xingshi: string;
  num: string;
  pingming: string;
  xinxi: string;
}
interface IFormItemProps {
  label: string;
  prop: keyof IFormProps;
  render?: (prop: string, record: IFormItemProps) => JSX.Element;
}

const formItems: IFormItemProps[] = [
  {label: '机台号', prop: 'user'},
  {label: '批号', prop: 'eqpId'},
  {label: '剩余数量', prop: 'pihao'},
  {label: '工序', prop: 'user'},
  {label: '组装批号', prop: 'user'},
  {label: '芯片名', prop: 'user'},
  {label: '封装形式', prop: 'user'},
  {label: '批次数量', prop: 'user'},
  {label: '品名', prop: 'user'},
  {label: '料盒条码信息', prop: 'user'},
];

const UserCard: React.FC = () => {
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
            {item.render ? (
              item.render(item.prop, item)
            ) : (
              <>
                <Text minW="20%" pl={2}>
                  {item.label}:{' '}
                </Text>
                <Text>{item.prop}</Text>
              </>
            )}
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

export default UserCard;
