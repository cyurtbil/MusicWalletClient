'use strict';

app.factory('walletFactory', [function() {

  var createUniqueWalletNamesArray = function(wallets) {
    var walletNames = [];
    for(var i = 0; i < wallets.length; i++) {
      walletNames.push(wallets[i].name);
    };

    return $.unique(walletNames);
  };

  return {
    createUniqueWalletNamesArray: createUniqueWalletNamesArray
  };
}]);