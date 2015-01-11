'use strict';

app.controller('SearchController', ['$scope', 'dataFactory', '$sce', function($scope, dataFactory, $sce) {

  $scope.searchSongs = function(params) {
    dataFactory.fetchTracksFromCloud(params).then(function(response) {
      $scope.trackSources = response.data.urls;
    });
  };

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };

}]);