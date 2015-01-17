'use strict';

app.controller('NavbarController', ['$scope',
                                    'authFactory',
                                    'dataFactory',
                                    'userFactory',
                                    '$window',
                                    '$location',
                                    function($scope, authFactory, dataFactory, userFactory, $window, $location) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  $scope.logout = function(user) {
    authFactory.logout().then(function() {
      $window.sessionStorage.removeItem('MusicWallet.user');
    });
  };
}]);