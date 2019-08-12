import {Settings} from 'utils/settings';
import {IMessage} from 'utils/types';
import {listeners} from '../../../utils/listeners';
import {messages} from '../../../../constants/routes';

export class Messages {
  settings: Settings;
  db: any;

  constructor(settings: Settings) {
    this.settings = settings;
    this.db = this.settings.getDb();
  }

  async add(message: IMessage) {
    const messageAdd = await this.db.messages.create(message);
    delete messageAdd.dataValues.updatedAt;
    delete messageAdd.dataValues.createdAt;
    listeners.notify(messages.add, message);
    return messageAdd.dataValues;
  }

  async get() {
    return await this.db.messages.findAll({raw: true});
  }
}
