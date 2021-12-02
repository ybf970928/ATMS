import request from '../utils/request';

interface HandleStopParams {
  eqpId: string;
  lotId: string;
  boxs: string;
  reason: string;
  remark?: string;
}

export function doStop(params: HandleStopParams) {
  return request('/pad/OperationStop/Operation', {
    method: 'POST',
    data: params,
  });
}
