import { FrontendPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('frontend App', function() {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should display login page correctly', () => {
    page.navigateTo('/login');
    expect(page.getElementByCss('.profile').isPresent()).toBeFalsy();
    expect(page.getElementByCss('.title-desc').getText()).toEqual('Make all todo names short. You have a description clicking on it');
    expect(page.getElementByCss('.title-info').getText()).toEqual('Here you will receive different information alerts');
    expect(page.getElementByCss('.title-info').getAttribute('class')).toContain('alert-info');
    page.getElementByCss('.username').sendKeys('alexk');
    page.getElementByCss('.password').sendKeys('123456');
    page.getElementByCss('.login-btn').click().then(function () {
      page.getElementByCss('.todos-btn').click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/alexk/todos');
    });
  });

  it('should display user todos page correctly', () => {
    page.navigateTo('/alexk/todos');
    expect(element.all(by.css('.action')).count()).toEqual(1);
    // Add todos
    page.getElementByCss('.text-input').sendKeys('add something');
    page.getElementByCss('.add-btn').click().then(function () {
      expect(element.all(by.css('.action')).count()).toEqual(2);
    });
    // Change todos isCompleted
    expect(element.all(by.css('.action-check')).get(0).getAttribute('checked')).toBeFalsy();
    element.all(by.css('.action-check')).get(0).click();
    expect(element.all(by.css('.action-check')).get(0).getAttribute('checked')).toBeTruthy();
    element.all(by.css('.action-check')).get(0).click();
    expect(element.all(by.css('.action-check')).get(0).getAttribute('checked')).toBeFalsy();
    // Delete todos
    element.all(by.css('.action-delete')).get(1).click();
    expect(element.all(by.css('.action')).count()).toEqual(1);
    page.getElementByCss('.action-link').click();
    browser.wait(function () {
      return browser.getCurrentUrl().then(function(url) {
        return (url.indexOf('/alexk/todo/1') !== -1);
      });
    }, 1000);
  });

  it('should display user current todo\'s page correctly', () => {
    page.navigateTo('/alexk/todo/1');
    expect(page.getElementByCss('.action').isPresent).toBeTruthy();
    expect(page.getElementByCss('.action-text').getText()).toEqual('add to me');
    expect(page.getElementByCss('.action-done').getText()).toEqual('Not done');
    expect(page.getElementByCss('.description').getText()).toEqual('Add/Change your description here');
    expect(page.getElementByCss('.comment').getText()).toEqual('Add/Change your description here');
    page.getElementByCss('.btn-add').click();
    expect(page.getElementByCss('.description').getText()).toEqual('Add/Change your description here');
  });
});
