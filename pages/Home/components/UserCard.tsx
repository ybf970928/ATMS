import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Box, Text} from 'native-base';
import {getLotInfo} from '../../../services/public';
// import {getToken} from '../../../utils/auth';
import {getEqpId} from 'utils/user';
import {AuthContext} from '../../../layouts/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';

interface IUserFormProps {
  operId?: string;
  eqpId?: string;
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
  {label: '机台号', prop: 'eqpId'},
  {label: '批号', prop: 'lotId'},
  {label: '工序', prop: 'stepID'},
  {label: '当前状态', prop: 'trackStatus'},
  {label: '组装批号', prop: 'assemblyLotID'},
  {label: '芯片名', prop: 'chipName'},
  {label: '封装形式', prop: 'packageType'},
  {label: '批次数量', prop: 'deviceQty'},
];

const UserCard: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUserFormProps>({});
  const {setLotInfo} = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      const init = async () => {
        try {
          const eqpId = await getEqpId();
          const res = await getLotInfo({
            eqpId: eqpId,
            trackInPage: 1,
          });
          if (res.code === 1) {
            setUserInfo({
              ...res.data,
              trackStatus: res.data.trackStatus ? '已开批' : '未开批',
            });
            setLotInfo(res.data);
          } else {
            setUserInfo({});
            setLotInfo({});
          }
        } catch (error) {
          setUserInfo({});
          setLotInfo({});
        }
      };
      init();
    }, [setLotInfo]),
  );

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
