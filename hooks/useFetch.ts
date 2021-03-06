import {removeToken} from '../utils/auth';
import {removeUserInfo} from '../utils/user';

export type IAxios<D = any> = {
  code: number;
  message: number;
  data: D;
};

const defaultResolve = async (cb: Promise<IAxios>): Promise<IAxios> => {
  const res = await cb;
  if (res.message >= 1005 && res.message <= 1013) {
    removeToken();
    removeUserInfo();
    return Promise.reject('η»ιθΏζ');
  } else {
    if (res.code === 1) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  }
};

export default defaultResolve;
