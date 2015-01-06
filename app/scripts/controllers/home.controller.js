'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  function($scope, authFactory) {

  authFactory.createUserSession();

  $scope.logout = function() {
    authFactory.logout();
  };
}]);