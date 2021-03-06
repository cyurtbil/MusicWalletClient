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
    $('form[name="searchSongForm"]').stop(true, true).animate({top: "10px"}, 1000);
    dataFactory.fetchTracksFromCloud(params).then(function(response) {
      $scope.trackSources = response.data.urls
    });
  };

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };

  $scope.addToWallet = function(wallet, source) {
    songFactory.addSong(wallet, source).then(function(response) {
      var addedElementIndex = $scope.trackSources.indexOf(response.data.url);
      $scope.trackSources.splice(addedElementIndex, 1);
    });
  };

}]);