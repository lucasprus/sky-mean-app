'use strict';

/**
 * @ngdoc overview
 * @name skyMeanAppApp
 * @description
 * # skyMeanAppApp
 *
 * Main module of the application.
 */
angular
  .module('skyMeanAppApp', ['ngRoute', 'skyMeanAppApp.controllers', 'skyMeanAppApp.services'])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: 'views/main.html',
          controller: 'MainController'
        })
        .when('/sign-in', {
          templateUrl: 'views/sign_in.html'
        })
        .when('/restricted-content', {
          templateUrl: 'views/restricted_content.html',
          controller: 'RestrictedContentController'
        })
        .when('/', {
          redirectTo: '/home'
        })
        .when('/404', {
          templateUrl: 'views/404.html'
        })
        .otherwise({
          redirectTo: '/404'
        });
    }
  ]);
