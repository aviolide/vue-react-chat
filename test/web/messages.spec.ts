import {expect, assert} from 'chai';
import chrome from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';
import {CommonTest} from './common-test';
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
import {app} from 'modules/messages/app';
import {Api} from 'utils/api';

const api = new Api({messages: true});
const dbMessages = app.settings.getDb();

const commonTest = new CommonTest();
describe('Frontend test', () => {
  let driver;

  before(async () => {
    await app.start();
    await dbMessages.sequelize.sync({force: true});
  });

  beforeEach(async () => {
    driver = await commonTest.beforeEachLoop();

    commonTest.setDriver(driver);
  });

  afterEach(async () => {
    await commonTest.stop();
  });

  after(async () => {});

  describe('#check', () => {
    it('Проверка отправки сообщений на 2х вкладках', async () => {
      await commonTest.createTab();
      const tabs = await commonTest.getAllTabs();
      await commonTest.switchTab(tabs[0]);

      const message = 'message1';
      const response = await commonTest.editField('.chat-input', message);
      await driver.sleep(1000);
      await commonTest.switchTab(tabs[1]);

      const messsageGetFirstTab = await commonTest.getContent('.chat-message', {
        all: true
      });

      expect(messsageGetFirstTab[0]).equal(message);
      await commonTest.switchTab(tabs[0]);

      const messsageGetSecTab = await commonTest.getContent('.chat-message', {
        all: true
      });

      expect(messsageGetFirstTab[0]).equal(messsageGetSecTab[0]);
    });
  });
});
