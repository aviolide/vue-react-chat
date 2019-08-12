export type TypeModules = TypeModuleChat;
export type TypeModuleChat = 'chat';

import {configsPorts} from '../../configs/ports';
import {configsDatabase} from '../../configs/base';

export class MainSettings {
  public name: TypeModules;
  public configs: any;

  constructor(name?: any) {
    this.name = name;
    this.configs = configsPorts;
    this.configs.database = configsDatabase;
  }

  getSocketUrl(module: TypeModules) {
    return `ws://0.0.0.0:${this.configs[module].port}/`;
  }

  getSocketConfig(): SocketIOClient.ConnectOpts {
    return {
      transports: ['websocket']
    };
  }
}
