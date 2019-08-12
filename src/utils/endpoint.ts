import * as io from 'socket.io-client';

export class Endpoint {
  public io: SocketIOClient.Socket;
  config: any;

  constructor(socketUri, config: SocketIOClient.ConnectOpts) {
    this.config = config;
    this.io = io.connect(socketUri, config);
  }

  async call(entity: string, method: any, ...args) {
    const route = `${entity}.${method}`;
    const query = {...args[0]};
    return await this.send(route, query);
  }

  send(route: string, query: any) {
    console.log('send', route, query);
    return new Promise((resolve) => {
      this.io.emit(route, query, resolve);
    });
  }
}
