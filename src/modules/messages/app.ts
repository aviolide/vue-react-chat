require('@babel/register');
require('ts-node');
require('tsconfig-paths/register');

import {Api} from 'utils/api';
import {Settings} from 'utils/settings';
import {TypeModuleMessages} from 'utils/main-settings';
import path from 'path';
import {Routes} from 'utils/routes';
import {Messages} from 'modules/messages/controllers/messages';
import {Members} from 'modules/messages/controllers/members';
import {Sockets} from 'utils/sockets';
import {membersDb} from '../../../constants/members';

class App {
  private readonly name: TypeModuleMessages = 'messages';
  readonly settings: Settings;
  models = [
    path.resolve(__dirname, './models/message'),
    path.resolve(__dirname, './models/member')
  ];

  messages: Messages;
  members: Members;
  sockets: Sockets;
  api: Api;
  routes: Routes;

  constructor() {
    this.settings = new Settings(this.name);
    this.sockets = new Sockets(this.settings);
    this.api = new Api({messages: true, members: true});

    this.members = new Members(this.settings);
    this.messages = new Messages(this.settings);
    this.routes = new Routes({messages: this.messages, members: this.members});
  }

  async start() {
    this.settings.startServer(this.onConnection.bind(this));
    await this.settings.initDatabase(this.models);
    await this.setMembers();
    this.routes.setRoutes();
    console.log('start server');
  }

  onConnection(socket: any) {
    console.log('chat start', socket.id, socket.user);

    this.sockets.add(socket.id, {socket});
    this.routes.init(socket);

    socket.on('disconnect', () => {
      console.log('warning, socket disconnected!');
    });
  }

  async setMembers() {
    for (const member of membersDb){
      await this.members.add(member);
    }
  }
}

export const app = new App();
