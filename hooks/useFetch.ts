import {removeToken} from '../utils/auth';
import {removeLotId, removeUserInfo} from '../utils/user';

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
    removeLotId();
    return Promise.reject('登陆过期');
  } else {
    if (res.code === 1) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  }
};

export default defaultResolve;
