'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  function($scope, authFactory) {

  authFactory.createUserSession();

  $(document).ready(function() {
    $('body').removeClass('bg');
  });

  $scope.logout = function() {
    authFactory.logout();
  };
}]);