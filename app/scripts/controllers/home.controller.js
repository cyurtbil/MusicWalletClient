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
    authFactory.logout();
  };
}]);