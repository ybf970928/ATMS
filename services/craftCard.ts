import request from '../utils/request';

interface CardParams {
  lotId: string;
  eqpId: string;
}
export async function getCardPath(params: CardParams) {
  return request('/pad/MainPage/GetProcessCardPath', {
    method: 'get',
    params: params,
  });
}
