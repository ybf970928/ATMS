import request from '../utils/request';

interface TrackOutParams {
  lotHistoryId: string;
  eqpId: string;
  lotId: string;
  jobNum: string;
  boxs: string;
  scrapList: Array<{qty: string; reason: string}>;
  defectiveList: Array<{qty: string; reason: string}>;
}

interface YieldInfoParams {
  eqpId: string;
  lotId: string;
}

export async function doTrackOut(params: TrackOutParams) {
  return request('/pad/TrackOut/TrackOut', {
    method: 'POST',
    data: params,
  });
}

// 获取产量信息
export async function getYieldInfo(params: YieldInfoParams) {
  return request('/pad/HandOver/GetYieldInfo', {
    method: 'get',
    params: params,
  });
}
