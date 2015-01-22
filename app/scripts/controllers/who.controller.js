'use strict';

app.controller('WhoController', ['$scope', 'dataFactory', function($scope, dataFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.users = response.data.users;
  });

  $scope.getMaxUserWallet = function(user) {
    var highestSongCountUserWallet = _.max(user.wallets, function(wallet) { return wallet.song_count;});
    return [highestSongCountUserWallet.name, highestSongCountUserWallet.song_count];
  };


}]);