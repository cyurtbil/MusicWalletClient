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
  $scope.doesExist = true;

  $scope.registerUser = function(user) {
    var userParams = {user: user};

    if(user.password === user.password_confirmation) {
      dataFactory.fetchUsers().then(function(response) {
        var existingUser = response.data.users.filter(function(element) {return element.username === user.username})[0];
        if(!existingUser) {
          userFactory.registerUser(userParams).then(function(response) {
            authFactory.createUserSession(response.data);
            $location.path('/');
          });
        } else {
          $scope.existingUsername = existingUser.username;
          $scope.doesExist = false;
          $('#existing-error').slideDown(200);
          $('#existing-error').delay(3000).slideUp(200);
        };
      });
    } else {
      $scope.doesPasswordsMatch = false;
      $('#password-error').slideDown(200);
      $('#password-error').delay(3000).slideUp(200);
    };
  };
}]);