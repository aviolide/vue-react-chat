import _ from 'lodash';
import webdriver, {By, WebDriver, WebElement} from 'selenium-webdriver';

import {expect} from 'chai';
import fs from 'fs';
import {del} from 'selenium-webdriver/http';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';

export class CommonTest {
  private driver: WebDriver;

  private activeTab: any = '';
  private delay: number;

  constructor() {
    this.delay = 1000;
  }

  setDriver(driver: WebDriver) {
    this.driver = driver;
  }

  async getContent(css, options: any = {all: false, toInt: false}) {
    let items;

    if (_.isString(css)) {
      try {
        await this.driver.wait(
          webdriver.until.elementLocated(webdriver.By.css(css)),
          this.delay
        );
      } catch (error) {
        console.log(error);
        if (options.toInt) {
          return 0;
        }
        return false;
      }

      items = await this.driver.findElements(webdriver.By.css(css));
    } else {
      items = css;
    }

    let text: Array<any> | number = [];

    if (options.all) {
      for (const i of items) {
        let content = await i.getText();
        if (options.toInt) content = _.toInteger(content);
        text.push(content);
      }
    } else {
      //TODO check it. profiles #edit #4 may be dont work without it
      console.log();
      text = await items[0].getText();
      if (options.toInt) {
        text = _.toInteger(text);
      }
    }

    return text;
  }

  async createTab() {
    await this.driver.executeScript('window.open("..");');
    const tabs = await this.driver.getAllWindowHandles();
    this.activeTab = tabs[tabs.length - 1];
    return tabs[tabs.length - 1];
  }

  async getAllTabs() {
    return await this.driver.getAllWindowHandles();
  }

  // Хранит активную вкладку, если не указывать id вкладки то перейдет на следующую (по кругу). Возвращает активную вкладку.
  async switchTab(tab: any) {
    const tabs = await this.driver.getAllWindowHandles();

    if (_.isNumber(tab)) {
      this.activeTab = tabs[tab];
      await this.driver.switchTo().window(tabs[tab]);
      return this.activeTab;
    }

    this.activeTab = tab;
    let index = tabs.indexOf(tab);
    if (!index) {
      index = 0;
    }

    await this.driver.switchTo().window(tabs[index]);
    // await this.untilElementLocated('#preloader');
    return this.activeTab;
  }

  async untilFillElement(css: string, keys, isClear: boolean = false) {
    try {
      await this.driver.wait(
        webdriver.until.elementLocated(webdriver.By.css(css)),
        this.delay
      );
    } catch (error) {
      console.log(error);
      return false;
    }
    //driver.sleep(delay);
    const item = await this.driver.findElements(webdriver.By.css(css));
    if (isClear) {
      item[0].clear();
    }
    await item[0].sendKeys(
      webdriver.Key.chord(webdriver.Key.CONTROL, 'a'),
      keys
    );
    await item[0].sendKeys(webdriver.Key.RETURN);
  }

  async editField(css: any, fillData) {
    const response = await this.untilFillElement(css, fillData, true);
    expect(response).to.not.equal(false);
  }

  async beforeEachLoop() {
    this.activeTab = 0;
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    driver
      .manage()
      .window()
      .maximize();
    await driver.get('http://localhost:3000');
    return driver;
  }

  async stop() {
    await this.driver.quit();
  }
}
