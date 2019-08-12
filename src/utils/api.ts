import {MainSettings, TypeModules} from './main-settings';
import {Endpoint} from './endpoint';
import Handler from './handler';

interface IApi {
  messages?: boolean;
  members?: boolean;
  site?: boolean;
}
export class Api {
  endpoints: {[key: string]: Endpoint} = {};
  settings: MainSettings;
  messages: any;
  members: any;

  constructor(services: IApi) {
    this.settings = new MainSettings();

    for (const service in services) {
      this.endpoints[service] = new Endpoint(
        this.settings.getSocketUrl('chat'),
        this.settings.getSocketConfig()
      );
    }
    this.setProxy();
  }

  setProxy() {
    this.messages = new Proxy(
      {},
      new Handler('messages', this.endpoints.messages)
    );

    this.members = new Proxy(
      {},
      new Handler('members', this.endpoints.members)
    );
  }
}
