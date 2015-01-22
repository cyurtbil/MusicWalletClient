'use strict';

app.controller('WhoController', ['$scope', 'dataFactory', 'colorService', function($scope, dataFactory, colorService) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.users = response.data.users;
  });

  $scope.getMaxUserWallet = function(user) {
    var highestSongCountUserWallet = _.max(user.wallets, function(wallet) { return wallet.song_count; });
    var walletName = highestSongCountUserWallet.name
    colorService.defineColor(walletName, ("." + walletName));
    return [highestSongCountUserWallet.name, highestSongCountUserWallet.song_count];
  };



}]);