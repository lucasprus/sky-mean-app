'use strict';

describe('SKY MEAN app', function () {
  var username = element(by.model('user.username')),
    spanUsernameRequired = element(by.id('spanUsernameRequired')),
    spanUsernamePattern = element(by.id('spanUsernamePattern')),
    password = element(by.model('user.password')),
    submitButton = element(by.css('form button[type="submit"]')),
    signInForm = element(by.id('signInForm')),
    signOutAnchor = element(by.id('signOutAnchor')),
    loginAttempts = element(by.binding('loginAttempts')),
    alerts = element.all(by.repeater('alert in alerts')),
    // alertMessages = element.all(by.binding('alert.message')),
    restrictedContent = element(by.binding('content'));

  function invalidLoginAttempt() {
    username.sendKeys('invalidUsername');
    password.sendKeys('orPassword');
    submitButton.click();
  }

  function validAdminLoginAttempt() {
    username.sendKeys('admin');
    password.sendKeys('password');
    submitButton.click();
  }

  describe('on sign in form', function () {
    beforeEach(function () {
      browser.get('http://localhost:3000/production/#/sign-in');
    });

    /*it('should have a title', function() {
      expect(browser.getTitle()).toEqual('Super Calculator');
    });*/

    it('should show/hide required error message for username', function () {
      expect(spanUsernameRequired.isDisplayed()).toBe(false);
      username.sendKeys(' ');
      expect(spanUsernameRequired.isDisplayed()).toBe(true);
      username.sendKeys('admin');
      expect(spanUsernameRequired.isDisplayed()).toBe(false);
    });

    it('should set validation errors', function () {
      expect(signInForm.evaluate('signInForm.inputUsername.$valid')).toBe(false);
      expect(signInForm.evaluate('signInForm.inputUsername.$error.required')).toBe(true);
      username.sendKeys('admin');
      expect(signInForm.evaluate('signInForm.inputUsername.$valid')).toBe(true);
      expect(signInForm.evaluate('signInForm.inputUsername.$error.required')).toBe(false);
      username.clear();
      expect(signInForm.evaluate('signInForm.inputUsername.$valid')).toBe(false);
      expect(signInForm.evaluate('signInForm.inputUsername.$error.required')).toBe(true);
    });

    it('should show/hide single word error message for username', function () {
      expect(spanUsernamePattern.isDisplayed()).toBe(false);
      username.sendKeys('admin');
      expect(spanUsernamePattern.isDisplayed()).toBe(false);
      username.sendKeys(' admin');
      expect(spanUsernamePattern.isDisplayed()).toBe(true);
    });

    it('should display login attempts', function () {
      invalidLoginAttempt();
      expect(loginAttempts.getText()).toContain('"username":"invalidUsername","password":"orPassword"');
      username.clear();
      password.clear();
      username.sendKeys('invalidUsername');
      password.sendKeys('orPassword');
      submitButton.click();
      expect(loginAttempts.getText()).toContain('{"username":"invalidUsername","password":"orPassword"},{"username":"invalidUsername","password":"orPassword"}');
      expect(loginAttempts.evaluate('loginAttempts.length')).toBe(2);
    });

  });

  describe('form submission', function () {
    beforeEach(function () {
      browser.get('http://localhost:3000/production/#/sign-in');
    });

    it('should display alert and automatically dismiss it after some time', function () {
      browser.ignoreSynchronization = true;
      invalidLoginAttempt();
      expect(alerts.count()).toEqual(1);
      browser.ignoreSynchronization = false;
      expect(alerts.count()).toEqual(0);
    });

    it('should display multiple alerts after multiple submissions and automatically dismiss them after some time', function () {
      browser.ignoreSynchronization = true;
      invalidLoginAttempt();
      expect(alerts.count()).toEqual(1);
      invalidLoginAttempt();
      expect(alerts.count()).toEqual(2);
      invalidLoginAttempt();
      expect(alerts.count()).toEqual(3);
      browser.ignoreSynchronization = false;
      expect(alerts.count()).toEqual(0);
    });

  });

  describe('on unsuccessful login', function () {
    beforeEach(function () {
      browser.get('http://localhost:3000/production/#/sign-in');
    });

    it('should display error alert when invalid login credentials submitted', function () {
      browser.ignoreSynchronization = true;
      invalidLoginAttempt();
      expect(alerts.count()).toEqual(1);
      expect(alerts.last().getText()).toContain('Invalid combination of username and password');
      browser.ignoreSynchronization = false;
    });

    it('should display multiple error alerts when multiple invalid login credentials submitted', function () {
      browser.ignoreSynchronization = true;
      invalidLoginAttempt();
      expect(alerts.count()).toEqual(1);
      expect(alerts.last().getText()).toContain('Invalid combination of username and password');
      invalidLoginAttempt();
      expect(alerts.count()).toEqual(2);
      expect(alerts.last().getText()).toContain('Invalid combination of username and password');
      invalidLoginAttempt();
      expect(alerts.count()).toEqual(3);
      expect(alerts.last().getText()).toContain('Invalid combination of username and password');
      browser.ignoreSynchronization = false;
    });
  });


  describe('on successful login', function () {

    beforeEach(function () {
      browser.get('http://localhost:3000/production/#/sign-in');
      browser.ignoreSynchronization = true;
      validAdminLoginAttempt();
    });

    afterEach(function () {
      browser.ignoreSynchronization = false;
    });

    it('should redirect to section with restricted content and display success alert and greeting', function () {
      expect(browser.getLocationAbsUrl()).toContain('/#/restricted-content');
      expect(restrictedContent.getText()).toBe('Welcome to the restricted content section admin!');
      expect(alerts.count()).toEqual(1);
      expect(alerts.last().getText()).toContain('Successfully signed in');
    });

    it('should not allow to log in again until you log out', function () {
      expect(alerts.count()).toEqual(1);
      expect(alerts.last().getText()).toContain('Forbidden. Please log out first.');
      signOutAnchor.click();
      expect(alerts.count()).toEqual(2);
      expect(alerts.last().getText()).toContain('Successfully signed out');
    });

  });

});
