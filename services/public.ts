import request from '../utils/request';

interface LotInfoParams {
  eqpId: string;
  lotId?: string;
  trackInPage?: number;
}
// 工单信息
export function getLotInfo(params: LotInfoParams) {
  return request('/pad/MainPage/GetLotInfo', {
    method: 'get',
    params: params,
  });
}

// 材料信息
export function getAllMaterial(params: LotInfoParams) {
  return request('/pad/MainPage/GetAllMaterial', {
    method: 'get',
    params: params,
  });
}
