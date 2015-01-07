'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  '$location',
                                  function($scope, authFactory, $location) {

  authFactory.getCurrentUser().then(function(response) {
    if(response.data.current_user) {
      authFactory.createUserSession(response);
    } else {
      $location.path('/');
    }
  });

  $(document).ready(function() {
    $('body').removeClass('bg');
  });

  $scope.logout = function() {
    authFactory.logout();
  };
}]);