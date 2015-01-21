'use strict';

app.controller('ProfileController', ['$scope',
                                     'dataFactory',
                                     'userFactory',
                                     'walletFactory',
                                     '$sce',
                                     'songFactory',
                                     function($scope, dataFactory, userFactory, walletFactory, $sce, songFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
    walletFactory.resetWalletActivation($scope.currentUser.wallets);
  });

  $scope.viewSongs = function(wallet, wallets) {
    walletFactory.resetWalletActivation(wallets);
    wallet.active = true;
    walletFactory.getWallet(wallet).then(function(response) {
      $scope.walletSongs = response.data.songs;
    });
  }; 

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };

  $scope.removeFromWallet = function(song) {
    songFactory.removeSong(song).then(function() {
      var removedElementIndex = $scope.walletSongs.indexOf(song);
      $scope.walletSongs.splice(removedElementIndex, 1);
    });
  };

  $scope.MoveToWallet = function(wallet, song) {
    songFactory.updateSong(wallet, song).then(function(response) {
      var movedElementIndex = $scope.walletSongs.indexOf(song);
      $scope.walletSongs.splice(movedElementIndex, 1);
    });
  };
}]);