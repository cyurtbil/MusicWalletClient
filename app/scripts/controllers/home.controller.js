'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  '$location',
                                  function($scope, authFactory, $location) {

  $(document).ready(function() {
    $('body').removeClass('bg');
  });

  $scope.logout = function() {
    authFactory.logout();
  };
}]);