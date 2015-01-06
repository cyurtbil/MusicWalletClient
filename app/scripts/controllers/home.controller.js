'use strict';

app.controller('HomeController', ['$http', 
                                  'ServerUrl', 
                                  '$scope', 
                                  '$location',
                                  '$window',
                                  function($http, ServerUrl, $scope, $location, $window) {

  $http.get(ServerUrl + 'users/get_current_user').success(function(response) {
    $window.sessionStorage.setItem('MusicWallet.user', response.current_user.token);
    $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('MusicWallet.user');
  });

  $scope.logout = function() {
    $http.get(ServerUrl + 'logout').success(function(response) {
      $window.sessionStorage.removeItem('MusicWallet.user');
      $location.path('/');
    });
  }
}]);