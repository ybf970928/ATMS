import {OEEForm} from '../pages/ChangeOEE';
import request from '../utils/request';

interface OEEParams {
  eqpId: string;
}

export async function doUpdate(params: OEEForm) {
  return request('/pad/OEEStatusSwitch/OEEStatusSwitchOk', {
    method: 'POST',
    data: params,
  });
}

export async function getOEEStatusSwitch(params: OEEParams) {
  return request('/pad/OEEStatusSwitch/GetOEEStatusSwitch', {
    method: 'get',
    params: params,
  });
}
// 根据状态带出原因代码
export async function getOEEReason(params: {statusCode: string}) {
  return request('/pad/OEEStatusSwitch/GetOEEReason', {
    method: 'get',
    params: params,
  });
}
