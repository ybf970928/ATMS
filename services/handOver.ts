import request from '../utils/request';

interface HandOverParams {
  eqpId: string;
  lotId: string;
  qty: string;
}

export async function doUpdate(params: HandOverParams) {
  return request('/pad/HandOver/HandOver', {
    method: 'POST',
    data: params,
  });
}
