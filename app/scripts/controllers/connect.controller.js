'use strict';

app.controller('ConnectController', ['$scope', 'authFactory', function($scope, authFactory) {


  $(document).ready(function() {
    $('body').addClass('bg');
  });

  authFactory.connect().then(function(response) {
    $scope.connect = response.data.url;
  });

  $scope.connectToCloud = function(event) {
    event.preventDefault();
    window.location.href = $scope.connect;
  };
}]);