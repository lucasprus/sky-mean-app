'use strict';

/* jasmine specs for services go here */

describe('service', function () {
  beforeEach(module('skyMeanAppApp.services'));

  describe('AlertMessagesService', function () {

    var AlertMessagesService, $timeout;

    beforeEach(inject(function (_$timeout_, _AlertMessagesService_) {
      $timeout = _$timeout_;
      AlertMessagesService = _AlertMessagesService_;
      AlertMessagesService.push({
        type: 'success',
        message: 'success message'
      }, {
        type: 'info',
        message: 'info message'
      });
    }));

    it('should add two alerts', function () {
      expect(AlertMessagesService.alerts.length).toBe(2);
    });

    it('should delete alerts after some time', function () {
      $timeout.flush();
      expect(AlertMessagesService.alerts.length).toBe(0);
    });
  });

});
