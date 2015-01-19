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

  var defineColor = function(walletName, event) {
    switch(walletName) {
      case "Dark":
        $(event.delegateTarget).css("background-color", "black");
        break;
      case "Chill":
        $(event.delegateTarget).css("background-color", "rgb(95, 147, 225)");
        break;
      case "Happy":
        $(event.delegateTarget).css("background-color", "rgb(239, 164, 86)");
        break;
      case "Party":
        $(event.delegateTarget).css("background-color", "rgb(177, 177, 13)");
        break;
      case "Dance":
        $(event.delegateTarget).css("background-color", "rgb(30, 142, 141)");
        break;
      case "Sport":
        $(event.delegateTarget).css("background-color", "rgb(11, 44, 114)");
        break;
      case "Mixed Moods":
        $(event.delegateTarget).css({"background-color": "white", "border": "black"});
        $(event.delegateTarget).children().css("color", "black");
        break;
      case "Sad":
        $(event.delegateTarget).css("background-color", "grey");
        break;
      case "Angry":
        $(event.delegateTarget).css("background-color", "rgb(106, 5, 5)");
        break;
      case "Dreamy":
        $(event.delegateTarget).css("background-color", "purple");
        break;
      case "Illegal":
        $(event.delegateTarget).css("background-color", "rgb(101, 79, 6)");
        break;
      case "Pumped":
        $(event.delegateTarget).css("background-color", "rgb(190, 24, 24)");
        break;
    }
  };

  var resetWalletActivation = function(wallets) {
    wallets.forEach(function(wallet) {
      wallet.active = false;
    });
  };

  return {
    createUniqueWalletNamesArray: createUniqueWalletNamesArray,
    getWallet: getWallet,
    extractSongsFromClickedWallet: extractSongsFromClickedWallet,
    defineColor: defineColor,
    resetWalletActivation: resetWalletActivation
  };
}]);