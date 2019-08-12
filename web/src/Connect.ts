import {Api} from '../../src/utils/api';
import {messages} from './routes';
import {membersModule, messagesModule} from './ts/store';
import {members} from '../../constants/routes';

class Connect {
  api: Api;

  constructor() {}
  async init() {
    this.api = new Api({messages: true, members: true});
    this.api.messages.on(messages.add, (data) => {
      messagesModule.add(data);
    });
    this.api.members.on(members.add, (data) => {
      membersModule.add(data);
    });
  }
}

const connect = new Connect();
connect.init();
export const api = connect.api;
