import {scrapProps} from '../pages/TrackOut/components/Scrap';
import request from '../utils/request';

interface TrackOutParams {
  lotHistoryId?: string;
  eqpId?: string;
  lotId?: string;
  remainingQty?: string;
  jobNum?: string;
  boxs?: string;
  scrapList?: scrapProps[];
  defectiveList?: scrapProps[];
}

interface YieldInfoParams {
  eqpId: string;
  lotId: string;
}

export function doTrackOut(params: TrackOutParams) {
  return request('/pad/TrackOut/TrackOut', {
    method: 'POST',
    data: params,
  });
}

// 获取产量信息
export function getYieldInfo(params: YieldInfoParams) {
  return request('/pad/HandOver/GetYieldInfo', {
    method: 'get',
    params: params,
  });
}
