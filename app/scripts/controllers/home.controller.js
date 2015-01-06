'use strict';

app.controller('HomeController', ['$http', 
                                  'ServerUrl', 
                                  '$scope', 
                                  '$location',
                                  '$window',
                                  'authFactory',
                                  function($http, ServerUrl, $scope, $location, $window, authFactory) {

  authFactory.createUserSession();

  $scope.logout = function() {
    $http.get(ServerUrl + 'logout').success(function(response) {
      $window.sessionStorage.removeItem('MusicWallet.user');
      $location.path('/');
    });
  }
}]);