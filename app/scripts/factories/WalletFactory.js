'use strict';

app.factory('walletFactory', ['$http', 'ServerUrl', function($http, ServerUrl) {

  var createUniqueWalletNamesArray = function(wallets) {
    var walletNames = [];
    wallets.forEach(function(wallet) {
      walletNames.push(wallet.name);
    });
    return walletNames.filter(function(walletName, index, self) {return self.indexOf(walletName) === index;});
  };

  var getWallet = function(wallet) {
    return $http.get(ServerUrl + 'wallets/' + wallet.id + '.json');
  };

  var extractSongsFromClickedWallet = function(wallets, currentUser, walletName) {
    var walletSongs = [];
    var clickedWallet = defineClickedWallet(wallets, walletName);
    clickedWallet.forEach(function(wallet) {
      if(wallet.user_id !== currentUser.id) {
        wallet.songs.forEach(function(song) {
          walletSongs.push(song);
        });
      }
    });
    return walletSongs;
  };

  var defineClickedWallet = function(wallets, walletName) {
    return wallets.filter(function(wallet) {
      return wallet.name === walletName;
    });
  };

  return {
    createUniqueWalletNamesArray: createUniqueWalletNamesArray,
    getWallet: getWallet,
    extractSongsFromClickedWallet: extractSongsFromClickedWallet
  };
}]);