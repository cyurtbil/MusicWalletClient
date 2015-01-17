'use strict';

app.controller('LoginController', ['authFactory', '$location', '$scope', function(authFactory, $location, $scope) {


  $scope.login = function(user) {
    authFactory.login(user).then(function(response) {
      authFactory.createUserSession(response.data);
      $location.path('/');
    });
  };
}]);