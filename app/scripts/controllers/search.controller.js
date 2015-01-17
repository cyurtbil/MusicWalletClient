'use strict';

app.controller('SearchController', ['$scope',
                                    'dataFactory',
                                    '$sce',
                                    'userFactory',
                                    'songFactory',
                                    function($scope, dataFactory, $sce, userFactory, songFactory) {

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
    songFactory.addSong(wallet, source).then(function(response) {
      debugger
      var removedElementIndex = $scope.trackSources.indexOf(response.data.url);
      $scope.trackSources.splice(removedElementIndex, 1);
    });
  };

}]);