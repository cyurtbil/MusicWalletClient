'use strict';

app.controller('NavbarController', ['$scope', 'authFactory', function($scope, authFactory) {

  $scope.logout = function() {
    authFactory.logout();
  };
}]);