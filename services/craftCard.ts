import request from '../utils/request';

export function getCardPath() {
  return request('/pad/MainPage/GetProcessCardPath', {
    method: 'get',
  });
}
