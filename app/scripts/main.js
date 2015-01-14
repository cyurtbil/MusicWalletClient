'use strict';

var app = angular.module('MusicWallet', ['ngRoute']);

app.constant('ServerUrl', 'http://localhost:3000/');

app.run(['$rootScope', '$window', '$http', 'authFactory', '$location', function($rootScope, $window, $http, authFactory, $location) {

  $rootScope.$on('$routeChangeStart', function(event, next) {
    var lastSlashIndex = window.location.hash.lastIndexOf('/');
    var currentUserName = window.location.hash.substring(lastSlashIndex + 1);
    var encodedData = window.btoa(currentUserName);
    authFactory.getCurrentUser(encodedData).then(function(response) {
      response.data.current_user ? authFactory.createUserSession(response) : $location.path('/');
    }, function(reason) {
      console.log(reason);
      $location.path('/');
    });
  });
}]);