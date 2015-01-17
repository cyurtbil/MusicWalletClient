'use strict';

var app = angular.module('MusicWallet', ['ngRoute']);

app.constant('ServerUrl', 'http://localhost:3000/');

app.run(['$rootScope', 'authFactory', '$location', function($rootScope, authFactory, $location) {

  $rootScope.$on('$routeChangeStart', function(event, next) {
      if(authFactory.isAuthenticated()) {
        authFactory.setHeaderAuthorization();
        $('body').removeClass('bg');
        if($location.path() === '/login' || $location.path() === '/register') {
          $('body').addClass('bg');
        }
      } else if($location.path() === '/register') {
        $location.path('/register');
        $('body').addClass('bg');
      } else {
        $('body').addClass('bg');
        $location.path('/login');
      }
  });
}]);