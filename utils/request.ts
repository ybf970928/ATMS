import axios from 'axios';
import {getToken} from './auth';
import {navigate} from './RootNavigation';
export const codeMessage: Record<number, string> = {
  0: '操作失败',
  1: '操作成功',
  1002: '用户不存在',
  1003: '密码不正确',
  1004: '记录不存在',
  1005: 'license无效',
  1006: 'license已过期',
  1007: '获取主机头失败',
  1008: '主机头为空',
  1009: '主机头不合法',
  1010: '获取认证信息失败',
  1011: '请求不合法，不存在认证信息',
  1012: '请求不合法，认证失败',
  1013: '请求不合法',
  1014: '参数错误',
  1015: '名称已存在',
  1016: '管理账号已存在',
  1017: '编码已存在',
  1018: '基础配置错误',
  1019: '导出失败',
  1020: '上传内容不存在',
  1021: '上传的文件不是Excel',
  1022: '导入失败',
  1023: '下载模板不存在',
  1024: '下载文件不存在',
  1025: '版本号已存在',
  50033: '数据元素值不存在!',
  50034: '请输入用户账号',
  50035: '请输入密码',
  50036: 'LDAP认证失败',
};

const service = axios.create({
  baseURL: 'http://10.100.101.22:8100',
  timeout: 6000,
  withCredentials: true,
});

// Add a request interceptor
service.interceptors.request.use(
  async config => {
    const authToken = await getToken();
    if (authToken) {
      config.headers.Token = authToken;
    }
    // Do something before request is sent
    config.headers['Content-Type'] = 'application/json';
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
      navigate('Login');
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
