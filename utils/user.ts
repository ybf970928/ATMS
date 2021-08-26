import AsyncStorage from '@react-native-async-storage/async-storage';
const USER = '@user';
const LOTID = '@lotId';

interface UserProps {
  eqpid: string;
  user: any;
  token: string;
  logo: string;
  minilogo: string;
}

export const setUserInfo = async (user: UserProps) => {
  try {
    await AsyncStorage.setItem(USER, JSON.stringify(user));
  } catch (e) {
    // saving error
  }
};

export const getUserInfo = async (): Promise<UserProps> => {
  try {
    const USER_INFO = await AsyncStorage.getItem(USER);
    // if (USER_INFO !== null) {
    // value previously stored
    return USER_INFO != null ? JSON.parse(USER_INFO) : null;
    // }
  } catch (e) {
    // error reading value
    return e;
  }
};

export const removeUserInfo = async () => {
  try {
    await AsyncStorage.removeItem(USER);
  } catch (e) {
    // saving error
  }
};

export const setLotId = async (lotId: string) => {
  try {
    await AsyncStorage.setItem(LOTID, lotId);
  } catch (e) {
    // saving error
  }
};

export const getLotId = async (): Promise<string | null> => {
  try {
    const LotId = await AsyncStorage.getItem(LOTID);
    return LotId != null ? LotId : null;
  } catch (e) {
    // saving error
    return e;
  }
};

export const removeLotId = async () => {
  try {
    await AsyncStorage.removeItem(LOTID);
  } catch (e) {
    // saving error
  }
};
