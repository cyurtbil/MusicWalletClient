'use strict';

var app = angular.module('MusicWallet', ['ngRoute']);

app.constant('ServerUrl', 'http://localhost:3000/');

app.run(['$rootScope', 'authFactory', '$location', function($rootScope, authFactory, $location) {

  $rootScope.$on('$routeChangeStart', function(event, next) {
      if(authFactory.isAuthenticated()) {
        authFactory.setHeaderAuthorization();
      } else if($location.path() === '/register') {
        $location.path('/register');
      } else {
        $location.path('/login');
      }
  });
}]);