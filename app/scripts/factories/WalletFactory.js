'use strict';

app.factory('walletFactory', [function() {

  var createUniqueWalletNamesArray = function(wallets) {
    var walletNames = [];
    for(var i = 0; i < wallets.length; i++) {
      walletNames.push(wallets[i].name);
    };
    return walletNames.filter(function(walletName, index, self) {return self.indexOf(walletName) === index;});
  };

  return {
    createUniqueWalletNamesArray: createUniqueWalletNamesArray
  };
}]);