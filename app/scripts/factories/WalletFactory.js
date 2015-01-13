'use strict';

app.factory('walletFactory', ['$http', 'ServerUrl', function($http, ServerUrl) {

  var createUniqueWalletNamesArray = function(wallets) {
    var walletNames = [];
    for(var i = 0; i < wallets.length; i++) {
      walletNames.push(wallets[i].name);
    };
    return walletNames.filter(function(walletName, index, self) {return self.indexOf(walletName) === index;});
  };

  var getWallet = function(wallet) {
    return $http.get(ServerUrl + 'wallets/' + wallet.id + '.json');
  };

  return {
    createUniqueWalletNamesArray: createUniqueWalletNamesArray,
    getWallet: getWallet
  };
}]);