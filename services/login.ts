import request from '../utils/request';

interface UserLoginParams {
  username: string;
  password: string;
  ipaddress: string;
  loginType: number;
}

export function accountLogin(params: UserLoginParams) {
  return request('/config/Login/Login', {
    method: 'POST',
    data: params,
  });
}
