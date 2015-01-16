'use strict';

app.controller('ConnectController', ['$scope', 'authFactory', '$http', 'ServerUrl', '$window', 'dataFactory', 'userFactory', function($scope, authFactory, $http, ServerUrl, $window, dataFactory, userFactory) {


  $(document).ready(function() {
    $('body').addClass('bg');
  });


  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
    if(!!$scope.currentUser) {
      authFactory.logout($scope.currentUser).then(function() {
        $window.sessionStorage.removeItem('MusicWallet.user');
      });
    }
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