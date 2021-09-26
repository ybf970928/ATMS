class Socket {
  socket: WebSocket;
  constructor() {
    this.socket = new WebSocket('ws://10.100.10.24:8000');
    this.init();
    this.handleMessage();
  }
  init() {
    this.socket.onopen = () => {
      // connection opened
      this.socket.send('web open'); // send a message
    };
  }
  handleMessage(): Promise<any> {
    return new Promise(resolove => {
      this.socket.onmessage = (event: WebSocketMessageEvent) => {
        console.log('message was received', event.data);
        resolove(event.data);
      };
    });
  }
}

export {Socket};
