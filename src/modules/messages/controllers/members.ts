import {Settings} from 'utils/settings';
import {IMember, IMessage} from 'utils/types';
import {listeners} from '../../../utils/listeners';
import {members} from '../../../../constants/routes';

export class Members {
  settings: Settings;
  db: any;

  constructor(settings: Settings) {
    this.settings = settings;
    this.db = this.settings.getDb();
  }

  async add(member: IMember) {
    const memberAdd = await this.db.members.create(member);
    listeners.notify(members.add, member);
    return memberAdd.dataValues;
  }

  async get() {
    return await this.db.members.findAll({raw: true});
  }
}
