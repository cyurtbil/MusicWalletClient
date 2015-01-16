'use strict';

app.controller('ConnectController', ['$scope', 'authFactory', '$http', 'ServerUrl', '$window', function($scope, authFactory, $http, ServerUrl, $window) {


  $(document).ready(function() {
    $('body').addClass('bg');
  });

  authFactory.connect().then(function(response) {
    $scope.connect = response.data.url;
  });

  $scope.connectToCloud = function(event) {
    event.preventDefault();
    $http.get(ServerUrl + 'users/create_different').success(function(response) {
      $window.sessionStorage.setItem('MusicWallet.user', response.token);
      $http.post(ServerUrl + 'users/store_user', {info: response}).success(function() {
        window.location.href = $scope.connect;
      });
    });
  };
}]);