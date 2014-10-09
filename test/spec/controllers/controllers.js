'use strict';

describe('Controllers: ', function () {

  beforeEach(module('skyMeanAppApp.controllers'));

  describe('AlertMessagesController', function () {

    var scope;

    beforeEach(inject(function ($rootScope, $controller, AlertMessagesService) {
      scope = $rootScope.$new();

      AlertMessagesService.push({
        type: 'success',
        message: 'success message'
      }, {
        type: 'info',
        message: 'info message'
      });

      $controller('AlertMessagesController', {
        $scope: scope
      });
    }));

    it('should have alerts set on scope', function () {
      expect(scope.alerts.length).toBe(2);
    });

    it('should delete dismissed alerts', function () {
      scope.dismiss(scope.alerts[0]);
      expect(scope.alerts.length).toBe(1);
      scope.dismiss(scope.alerts[0]);
      expect(scope.alerts.length).toBe(0);
    });

  });

  describe('SignInFormController', function () {

    var scope, user;

    describe('on successful sign in', function () {

      beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        user = {
          username: 'username',
          password: 'password'
        };
        $httpBackend.expectPOST('/session', user).respond(200, 'Successfully signed in');
        scope = $rootScope.$new();
        $controller('SignInFormController', {
          $scope: scope
        });
        scope.user = user;
        scope.submit();
        $httpBackend.flush();
      }));

      it('should change $location.path', inject(function ($location) {
        expect($location.path()).toBe('/restricted-content');
      }));

      it('should store login attempt', function () {
        expect(scope.loginAttempts.length).toBe(1);
        expect(scope.loginAttempts[0]).toEqual(user);
      });

      it('should add successful alert to AlertMessagesService', inject(function (AlertMessagesService) {
        expect(AlertMessagesService.alerts.length).toBe(1);
        expect(AlertMessagesService.alerts[0].type).toBe('success');
        expect(AlertMessagesService.alerts[0].message).toBe('Successfully signed in');
      }));

    });

    describe('on unsuccessful sign in', function () {

      beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        user = {
          username: 'username',
          password: 'password'
        };
        $httpBackend.expectPOST('/session', user).respond(401, 'Invalid combination of username and password');
        scope = $rootScope.$new();
        $controller('SignInFormController', {
          $scope: scope
        });
        scope.user = user;
        scope.signInForm = {
          $setPristine: jasmine.createSpy('$setPristine')
        };
        scope.submit();
        $httpBackend.flush();
      }));


      it('should reset username and password', function () {
        expect(scope.user.username).toBe('');
        expect(scope.user.password).toBe('');
      });

      it('should call $setPristine', function () {
        expect(scope.signInForm.$setPristine).toHaveBeenCalled();
      });

      it('should add successful alert to AlertMessagesService', inject(function (AlertMessagesService) {
        expect(AlertMessagesService.alerts.length).toBe(1);
        expect(AlertMessagesService.alerts[0].type).toBe('danger');
        expect(AlertMessagesService.alerts[0].message).toBe('Invalid combination of username and password');
      }));

    });

  });


});
