'use strict';

app.controller('ProfileController', ['$scope', 'dataFactory', 'userFactory', function($scope, dataFactory, userFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  
}]);