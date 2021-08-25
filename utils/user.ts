import AsyncStorage from '@react-native-async-storage/async-storage';
const USER = '@user';

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
