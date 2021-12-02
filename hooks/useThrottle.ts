import {useRef, useEffect, useCallback} from 'react';

export const useThrottle = (callback: () => void, delay: number) => {
  const savedCallback = useRef<{
    fn: Function;
    timer: null | NodeJS.Timeout;
  }>({fn: callback, timer: null});
  // 保存新回调
  useEffect(() => {
    savedCallback.current.fn = callback;
  });

  return useCallback(() => {
    if (!savedCallback.current.timer) {
      savedCallback.current.timer = setTimeout(() => {
        savedCallback.current.timer = null;
      }, delay);
      savedCallback.current.fn();
    }
  }, [delay]);
};
