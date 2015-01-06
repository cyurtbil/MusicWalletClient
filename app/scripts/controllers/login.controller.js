'use strict';

app.controller('LoginController', ['$scope', 'authFactory', function($scope, authFactory) {

  authFactory.login().then(function(response) {
    $scope.connect = response.data.url;
  });
}]);