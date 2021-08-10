import request from '../utils/request';

interface UserLoginParams {
  username: string;
  password: string;
  macAdress: string;
}

export async function accountLogin(params: UserLoginParams) {
  return request('/config/login/login', {
    method: 'POST',
    data: params,
  });
}
