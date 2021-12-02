import request from '../utils/request';

interface TrackInParams {
  eqpId: string;
  lotId: string;
}

export function doTrackIn(params: TrackInParams) {
  return request('/pad/TrakIn/TrackIn', {
    method: 'POST',
    data: params,
  });
}
