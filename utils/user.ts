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
    // value previously stored
    return USER_INFO != null ? JSON.parse(USER_INFO) : null;
    // }
  } catch (error) {
    // error reading value
    return error as UserProps;
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
    if (LotId) {
      return LotId;
    } else {
      throw new Error('oops');
    }
  } catch (e) {
    // saving error
    throw new Error('oops');
  }
};

export const removeLotId = async () => {
  try {
    await AsyncStorage.removeItem(LOTID);
  } catch (e) {
    // saving error
  }
};
