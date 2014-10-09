'use strict';

angular.module('skyMeanAppApp.services', [])
  .factory('Session', ['$http', function ($http) {

    return {
      start: function (user, onSuccess, onError) {
        $http.post('/session', user)
          .success(onSuccess)
          .error(onError);
      },
      destroy: function (onSuccess, onError) {
        $http.delete('/session')
          .success(onSuccess)
          .error(onError);
      }
    };

  }])
  .factory('AlertMessagesService', ['$timeout',
    function ($timeout) {

      return {
        alerts: [],
        push: function () {
          var alert, i = 0,
            l = arguments.length;

          function timeoutFunction(that, alert) {
            return function () {
              that.delete(alert);
            };
          }
          for (; i < l; i += 1) {
            alert = arguments[i];
            this.alerts.push(alert);
            var that = this;
            $timeout(timeoutFunction(that, alert), 3000);
          }
        },
        delete: function (alert) {
          var alerts = this.alerts;
          alerts.splice(alerts.indexOf(alert), 1);
        }
      };

    }
  ]);
