'use strict';

app.controller('NavbarController', ['$scope',
                                    'authFactory',
                                    'dataFactory',
                                    'userFactory',
                                    function($scope, authFactory, dataFactory, userFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  $scope.logout = function() {
    authFactory.logout();
  };
}]);