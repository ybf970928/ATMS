import {useState, useRef, useEffect} from 'react';

const useWebSocket = () => {
  const ws = useRef<WebSocket>();
  const [message, setMessage] = useState<any[]>([]);
  const [readyState, setReadyState] = useState<number>(0);

  const createWebSocket = () => {
    try {
      ws.current = new WebSocket('ws://10.100.10.24:8000');
      ws.current.onopen = () => {
        setReadyState(ws.current?.readyState || 0);
      };
      ws.current.onclose = () => {
        setReadyState(ws.current?.readyState || 0);
      };
      ws.current.onerror = () => {
        setReadyState(ws.current?.readyState || 0);
      };
      ws.current.onmessage = (event: WebSocketMessageEvent) => {
        setMessage(JSON.parse(event.data));
      };
    } catch (error) {
      throw new Error('socket 连接失败');
    }
  };
  const initWebsocket = () => {
    if (!ws.current || ws.current.readyState === 3) {
      createWebSocket();
    }
  };
  const closeWebSocket = () => {
    ws.current?.close();
  };

  useEffect(() => {
    initWebsocket();
    return () => {
      ws.current?.close(1000);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  return {
    message,
    readyState,
    closeWebSocket,
  };
};

export default useWebSocket;
