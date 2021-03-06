import {OEEForm} from '../pages/ChangeOEE';
import request from '../utils/request';

interface OEEParams {
  eqpId: string;
}

export function doUpdate(params: OEEForm) {
  return request('/pad/OEEStatusSwitch/OEEStatusSwitchOk', {
    method: 'POST',
    data: params,
  });
}

export function getOEEStatusSwitch(params: OEEParams) {
  return request('/pad/OEEStatusSwitch/GetOEEStatusSwitch', {
    method: 'get',
    params: params,
  });
}
// 作业中止页面，原因代码
export function getOperationStop() {
  return request('/pad/OperationStop/GetReasonCode', {
    method: 'get',
  });
}

// 根据状态带出原因代码
export function getOEEReason(params: {statusCode: string}) {
  return request('/pad/OEEStatusSwitch/GetOEEReason', {
    method: 'get',
    params: params,
  });
}
