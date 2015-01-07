'use strict';

var app = angular.module('MusicWallet', ['ngRoute']);

app.constant('ServerUrl', 'http://localhost:3000/');

app.run(['$rootScope', '$window', '$http', 'authFactory', '$location', function($rootScope, $window, $http, authFactory, $location) {

  $rootScope.$on('$routeChangeStart', function(event, next) {

    authFactory.getCurrentUser().then(function(response) {
      response.data.current_user ? authFactory.createUserSession(response) : $location.path('/');
    });
  });
}]);