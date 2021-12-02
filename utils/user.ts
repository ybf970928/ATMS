import AsyncStorage from '@react-native-async-storage/async-storage';
const USER = '@user';
const EQPID = '@eqpId';

type UserProps = {
  id: string;
  userID: string;
  userName: string;
  department: string;
  email: string;
  mobilePhone: string;
  avatar: string;
};

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

export const setEqpId = async (eqpId: string) => {
  try {
    await AsyncStorage.setItem(EQPID, eqpId);
  } catch (e) {
    // saving error
  }
};

export const getEqpId = async (): Promise<string> => {
  try {
    const eqpId = await AsyncStorage.getItem(EQPID);
    return eqpId as string;
  } catch (e) {
    // saving error
    throw new Error('oops');
  }
};

export const removeEqpId = async () => {
  try {
    await AsyncStorage.removeItem(EQPID);
  } catch (e) {
    // saving error
  }
};
