'use strict';

app.controller('RegisterController', ['$scope',
                                      'authFactory',
                                      'dataFactory',
                                      'userFactory',
                                      '$location',
                                      function($scope, authFactory, dataFactory, userFactory, $location) {

  $(document).ready(function() {
    $('body').addClass('bg');
  });

  $scope.doesPasswordsMatch = true;

  $scope.registerUser = function(user) {
    var userParams = {user: user};

    if(user.password === user.password_confirmation) {
      userFactory.registerUser(userParams).then(function(response) {
        authFactory.createUserSession(response.data);
        $location.path('/');
      });
    } else {
      $scope.doesPasswordsMatch = false;
      $('#password-error').slideDown(200);
      $('#password-error').delay(3000).slideUp(200);
    };
  };
}]);