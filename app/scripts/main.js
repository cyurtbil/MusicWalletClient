'use strict';

var app = angular.module('MusicWallet', ['ngRoute']);

app.constant('ServerUrl', 'http://localhost:3000/');

app.run(['$rootScope', '$window', '$http', 'authFactory', function($rootScope, $window, $http, authFactory) {

  $rootScope.$on('$routeChangeStart', function(event, next) {
    if(authFactory.isAuthenticated()) {
      $http.defaults.headers.common['Authorization'] = "Token token=" + $window.sessionStorage.getItem('MusicWallet.user');
    }
  });
}]);