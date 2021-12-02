import request from '../utils/request';

interface materials {
  eqpId: string;
  lotId: string;
  trackStatus?: 0 | 1;
}

export interface MaterialCompared {
  cType?: string;
  lotId?: string;
  eqpId?: string;
  barCode?: string;
  stepId?: string;
  innerThread?: string;
  bondingHead?: string;
  check?: number;
  oldBarCode?: string;
  oldBondingHead?: string;
}

// 初始化
export function getMaterials(params: materials) {
  return request('/pad/Materials/GetMaterial', {
    method: 'get',
    params: params,
  });
}

// 确认新增
export function doUpdate(params: MaterialCompared) {
  return request('/pad/Materials/MaterialCompared', {
    method: 'POST',
    data: params,
  });
}

export function getMaterialHistory(params: materials) {
  return request('/pad/Materials/GetMaterialHistory', {
    method: 'get',
    params: params,
  });
}
