'use strict';

app.controller('WhoController', ['$scope',
                                 'dataFactory',
                                 'colorService',
                                 'walletFactory',
                                 'userFactory',
                                 function($scope, dataFactory, colorService, walletFactory, userFactory) {

  $scope.search = {};

  dataFactory.fetchUsers().then(function(response) {
    $scope.users = response.data.users;
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  dataFactory.fetchWallets().then(function(response) {
    $scope.uniqueWalletNames = walletFactory.createUniqueWalletNamesArray(response.data.wallets);
  });

  $scope.getMaxUserWallet = function(user) {
    var highestSongCountUserWallet = _.max(user.wallets, function(wallet) { return wallet.song_count; });
    var walletName = highestSongCountUserWallet.name;
    var walletSongCount = highestSongCountUserWallet.song_count;
    colorService.defineColor(walletName, ("." + walletName));
    return [walletName, walletSongCount, highestSongCountUserWallet.id];
  };

}]);