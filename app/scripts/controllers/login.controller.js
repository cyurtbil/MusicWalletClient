'use strict';

app.controller('LoginController', ['$scope', 'authFactory', function($scope, authFactory) {


  $(document).ready(function() {
    $('body').addClass('bg');
  });

  authFactory.login().then(function(response) {
    $scope.connect = response.data.url;
  });
}]);