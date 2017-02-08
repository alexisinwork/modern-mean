import { browser, element, by } from 'protractor';

export class FrontendPage {
  navigateTo(page) {
    return browser.get(page);
  }

  getElementByCss(str) {
    return element(by.css(str));
  }
}
