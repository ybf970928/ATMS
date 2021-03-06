import axios from 'axios';
import {getToken, removeToken} from './auth';
import {removeUserInfo} from './user';

export const BASE_API = __DEV__
  ? 'http://10.100.101.22:8100'
  : //'http://10.100.101.22:8100';
    'http://192.168.20.12:8100';

const service = axios.create({
  baseURL: BASE_API,
  timeout: 20000,
  withCredentials: true, // 携带cookie
});

// Add a request interceptor
service.interceptors.request.use(
  async config => {
    const authToken = await getToken();
    if (authToken) {
      config.headers.Token = authToken;
    }
    // Do something before request is sent
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    const result = response.data.message;
    if (result >= 1005 && result <= 1013) {
      removeToken();
      removeUserInfo();
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
export default service;
