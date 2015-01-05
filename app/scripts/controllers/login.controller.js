'use strict';

app.controller('LoginController', ['$scope', '$http', 'ServerUrl', '$location','$window', function($scope, $http, ServerUrl, $location, $window) {



  $http.get(ServerUrl + 'cloud/get_redirect_uri').success(function(response) {
      $scope.connect = response.url;
  });
}]);