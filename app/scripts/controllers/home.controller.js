'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  '$location',
                                  'dataFactory',
                                  'walletFactory',
                                  '$sce',
                                  function($scope, authFactory, $location, dataFactory, walletFactory, $sce) {

  $(document).ready(function() {
    $('body').removeClass('bg');
  });

  dataFactory.fetchWallets().then(function(response) {
    $scope.wallets = response.data.wallets;
    $scope.uniqueWalletNames = walletFactory.createUniqueWalletNamesArray(response.data.wallets);
  });

  $scope.viewSongsOfAll = function(walletName) {
    var clickedWallet = $scope.wallets.filter(function(wallet) {return wallet.name === walletName;});
    $scope.walletSongs = [];
    clickedWallet.forEach(function(wallet) {
      wallet.songs.forEach(function(song) {
        $scope.walletSongs.push(song);
      });
    });
  };

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };
}]);