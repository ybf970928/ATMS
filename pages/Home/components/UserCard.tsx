import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Box, Text} from 'native-base';

interface FormTypes {
  label: string;
  value: string;
}
const formItem: FormTypes[] = [
  {label: '作业员', value: 'dasasa'},
  {label: '机台号', value: 'sadasdasas'},
  {label: '工序', value: 'dasafdsfdssa'},
  {label: '当前状态', value: 'fvvdfdf'},
  {label: '组装批号', value: 'dadadasrrb'},
  {label: '芯片名', value: 'fdssdfsdfsd'},
  {label: '封装形式', value: 'dsbdjhsbkds'},
  {label: '批次数量', value: 'cczxcsds'},
];

const UserCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Box
        bg="white"
        maxWidth="100%"
        padding={4}
        rounded="lg"
        flexDirection="row"
        flexWrap="wrap">
        {formItem.map((item, index) => {
          return (
            <View style={styles.cardItem} key={index}>
              <Text minW="28%" pl={2}>
                {item.label} :{' '}
              </Text>
              <Text maxW="60%">{item.value}</Text>
            </View>
          );
        })}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  cardItem: {
    width: '50%',
    flexDirection: 'row',
    marginBottom: 20,
    overflow: 'hidden',
  },
});
export default UserCard;
