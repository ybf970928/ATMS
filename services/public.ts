import request from '../utils/request';

interface LotInfoParams {
  eqpId: string;
  lotId: string;
}
// 工单信息
export async function getLotInfo(params: LotInfoParams) {
  return request('/pad/MainPage/GetLotInfo', {
    method: 'get',
    params: params,
  });
}

// 材料信息
export async function getAllMaterial(params: LotInfoParams) {
  return request('/pad/MainPage/GetAllMaterial', {
    method: 'get',
    params: params,
  });
}
