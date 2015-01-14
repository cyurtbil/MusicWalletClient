'use strict';

app.controller('NavbarController', ['$scope',
                                    'authFactory',
                                    'dataFactory',
                                    'userFactory',
                                    '$window',
                                    function($scope, authFactory, dataFactory, userFactory, $window) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  $scope.logout = function(user) {
    authFactory.logout(user).then(function() {
      $window.sessionStorage.removeItem('MusicWallet.user');
    });
  };
}]);