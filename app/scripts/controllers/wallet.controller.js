'use strict';

app.controller('WalletController', ['$scope',
                                    'dataFactory',
                                    'userFactory',
                                    '$location',
                                    'walletFactory',
                                    '$sce',
                                    'songFactory',
                                     function($scope, dataFactory, userFactory, $location, walletFactory, $sce, songFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  walletFactory.getWallet(walletFactory.getWalletIdfromUrl($location.path())).then(function(response) {
    $scope.currentWallet = response.data;
    $scope.walletSongs = response.data.songs;
  });

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };

  $scope.addToWallet = function(wallet, song) {
    songFactory.addSong(wallet, song.url).then(function(response) {
      var addedElementIndex = $scope.walletSongs.indexOf(song);
      $scope.walletSongs.splice(addedElementIndex, 1)
    });
  };
}]);