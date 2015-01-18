'use strict';

app.controller('ProfileController', ['$scope',
                                     'dataFactory',
                                     'userFactory',
                                     'walletFactory',
                                     '$sce',
                                     function($scope, dataFactory, userFactory, walletFactory, $sce) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
    resetWalletActivation($scope.currentUser.wallets);
  });

  $scope.viewSongs = function(wallet, wallets) {
    resetWalletActivation(wallets)
    wallet.active = true;
    walletFactory.getWallet(wallet).then(function(response) {
      $scope.walletSongs = response.data.songs;
    });
  }; 

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };

  var resetWalletActivation = function(wallets) {
    wallets.forEach(function(wallet) {
      wallet.active = false;
    });
  };
}]);