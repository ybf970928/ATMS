import {useState, useRef, useEffect, useCallback} from 'react';

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export interface Result {
  readyState: ReadyState;
  latestMessage?: WebSocketMessageEvent['data'];
  connect?: () => void;
  sendMessage?: WebSocket['send'];
  closeWebSocket?: WebSocket['close'];
}

const useWebSocket = (socketUrl: string): Result => {
  const websocketRef = useRef<WebSocket>();
  const [latestMessage, setLatestMessage] =
    useState<WebSocketMessageEvent['data']>();
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed);

  const connectWs = useCallback(() => {
    try {
      websocketRef.current = new WebSocket(socketUrl);
      websocketRef.current.onerror = () => {
        setReadyState(websocketRef.current?.readyState || ReadyState.Closed);
      };
      websocketRef.current.onopen = () => {
        setReadyState(websocketRef.current?.readyState || ReadyState.Closed);
      };
      websocketRef.current.onmessage = (event: WebSocketMessageEvent) => {
        setLatestMessage(JSON.parse(event.data));
      };
      websocketRef.current.onclose = () => {
        setReadyState(websocketRef.current?.readyState || ReadyState.Closed);
      };
    } catch (error) {
      throw error;
    }
  }, [socketUrl]);

  /**
   *
   * @param message 消息内容
   *
   */
  const sendMessage: WebSocket['send'] = (message: any) => {
    if (readyState === ReadyState.Open) {
      websocketRef.current?.send(message);
    } else {
      throw new Error('WebSocket disconnected');
    }
  };

  //手动连接ws
  const connect = () => {
    connectWs();
  };

  const closeWebSocket = () => {
    websocketRef.current?.close();
  };

  useEffect(() => {
    connectWs();
  }, [connectWs]);

  return {
    latestMessage,
    readyState,
    closeWebSocket,
    sendMessage,
    connect,
  };
};

export default useWebSocket;
