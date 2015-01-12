'use strict';

app.controller('SearchController', ['$scope',
                                    'dataFactory',
                                    '$sce',
                                    'userFactory',
                                    function($scope, dataFactory, $sce, userFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  $scope.searchSongs = function(params) {
    dataFactory.fetchTracksFromCloud(params).then(function(response) {
      $scope.trackSources = response.data.urls;
    });
  };

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };

  $scope.addToWallet = function(wallet, source) {
    debugger
  };

}]);