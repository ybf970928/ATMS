import request from '../utils/request';

interface HandOverParams {
  eqpId: string;
  lotId: string;
  qty: string;
}

export function doUpdate(params: HandOverParams) {
  return request('/pad/HandOver/HandOver', {
    method: 'POST',
    data: params,
  });
}
