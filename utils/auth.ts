import AsyncStorage from '@react-native-async-storage/async-storage';
const TokenKey = '@token';

export const getToken = async () => {
  try {
    const Token = await AsyncStorage.getItem(TokenKey);
    if (Token !== null) {
      // value previously stored
      return Token;
    }
  } catch (e) {
    // error reading value
  }
};

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TokenKey, token);
  } catch (e) {
    // saving error
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TokenKey);
  } catch (e) {
    // saving error
  }
};
