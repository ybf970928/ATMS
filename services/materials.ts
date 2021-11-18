import request from '../utils/request';

interface materials {
  lotId: string | number;
  eqpId: string;
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
}

// 初始化
export async function getMaterials(params: materials) {
  return request('/pad/Materials/GetMaterial', {
    method: 'get',
    params: params,
  });
}

// 确认新增
export async function doUpdate(params: MaterialCompared) {
  return request('/pad/Materials/MaterialCompared', {
    method: 'POST',
    data: params,
  });
}

export async function getMaterialHistory(params: materials) {
  return request('/pad/Materials/GetMaterialHistory', {
    method: 'get',
    params: params,
  });
}
