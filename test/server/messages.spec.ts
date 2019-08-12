import {assert} from 'chai';
import {app} from 'modules/messages/app';
import {Api} from 'utils/api';
import { membersDb } from "../../constants/members";

const api = new Api({messages: true, members: true});
const dbMessages = app.settings.getDb();

describe('Test database methods', () => {
  before(async () => {
    await app.start();
    await dbMessages.sequelize.sync({force: true});
  });

  beforeEach(async () => {});

  after(async () => {
    process.exit();
  });

  describe('#add', () => {
    it('Add message', async () => {
      const message = {message: 'first mess', date: Date.now()};
      const response = await api.messages.add(message);
      assert.equal(response.message, message.message);
    });

    it('Add member', async () => {
      const member = membersDb[0];
      const response = await api.members.add(member);
      assert.equal(response.login, member.login);
    });
  });

  describe('#get', () => {
    it('Get added message', async () => {
      const message = {message: 'first mess', date: Date.now()};
      const response = await api.messages.add(message);
      assert.equal(response.message, message.message);

      const getMes = await api.messages.get();
      assert.equal(getMes[0].message, message.message);
    });

    it('Get added members', async () => {
      await app.setMembers();

      const getMembers = await api.members.get();
      assert.equal(getMembers.length, membersDb.length);
    });
  });
});
