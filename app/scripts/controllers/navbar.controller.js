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

  $scope.toggleNavbar = function() {
    $('#collapse').stop(true, true).slideToggle(300);
  };

  $scope.changeHamburger = function() {
    $('#hamburger .line:eq(0)').toggleClass('line1');
    $('#hamburger .line:eq(1)').toggleClass('line2');
    $('#hamburger .line:eq(2)').toggleClass('line3');
  };
}]);