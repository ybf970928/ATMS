import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Box, Text} from 'native-base';
import {getLotInfo} from '../../../services/public';
import {getUserInfo, getLotId} from '../../../utils/user';
interface IUserFormProps {
  operId?: string;
  lotId?: string;
  stepID?: string;
  trackStatus?: string;
  assemblyLotID?: string;
  chipName?: string;
  packageType?: string;
  deviceQty?: string;
}

interface FormTypes {
  label: string;
  prop: keyof IUserFormProps;
}
const formItem: FormTypes[] = [
  {label: '作业员', prop: 'operId'},
  {label: '机台号', prop: 'lotId'},
  {label: '工序', prop: 'stepID'},
  {label: '当前状态', prop: 'trackStatus'},
  {label: '组装批号', prop: 'assemblyLotID'},
  {label: '芯片名', prop: 'chipName'},
  {label: '封装形式', prop: 'packageType'},
  {label: '批次数量', prop: 'deviceQty'},
];

const UserCard: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUserFormProps>({});

  useEffect(() => {
    const init = async () => {
      const lotId = await getLotId();
      if (lotId) {
        const {eqpid, user} = await getUserInfo();
        const res = await getLotInfo({
          eqpId: eqpid,
          lotId: lotId!,
        });
        setUserInfo({
          ...res.data,
          operId: user.userID,
        });
      }
    };
    init();
  }, []);

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
              <Text maxW="60%">{userInfo[item.prop]}</Text>
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
