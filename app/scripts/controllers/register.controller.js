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

  $scope.registerUser = function(user) {
    var userParams = {user: user};
    debugger
    userFactory.registerUser(userParams).then(function(response) {
      authFactory.createUserSession(response.data);
      $location.path('/');
    });
  };
}]);