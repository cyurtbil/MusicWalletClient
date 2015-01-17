'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  '$location',
                                  'dataFactory',
                                  'walletFactory',
                                  '$sce',
                                  'userFactory',
                                  function($scope, authFactory, $location, dataFactory, walletFactory, $sce, userFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  dataFactory.fetchWallets().then(function(response) {
    $scope.wallets = response.data.wallets;
    $scope.uniqueWalletNames = walletFactory.createUniqueWalletNamesArray(response.data.wallets);
  });

  $scope.viewSongsOfAll = function(walletName, event) {
    event.preventDefault();
    var clickedWallet = $scope.wallets.filter(function(wallet) {return wallet.name === walletName;});
    $scope.walletSongs = [];
    clickedWallet.forEach(function(wallet) {
      if(wallet.user_id !== $scope.currentUser.id) {
        wallet.songs.forEach(function(song) {
          $scope.walletSongs.push(song);
        });
      }
    });
  };

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };
}]);