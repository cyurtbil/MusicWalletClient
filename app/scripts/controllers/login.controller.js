'use strict';

app.controller('LoginController', ['authFactory', '$location', '$scope', function(authFactory, $location, $scope) {


  $scope.isLoginSuccessful = true;

  $scope.login = function(user) {
    authFactory.login(user).then(function(response) {
      authFactory.createUserSession(response.data);
      $location.path('/');
    }, function(reason) {
      $scope.isLoginSuccessful = false;
      $('#login-error').slideDown(200);
      $('#login-error').delay(3000).slideUp(200);
    });
  };
}]);