'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  '$location',
                                  'dataFactory',
                                  'walletFactory',
                                  '$sce',
                                  'userFactory',
                                  'songFactory',
                                  function($scope, authFactory, $location, dataFactory, walletFactory, $sce, userFactory, songFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  dataFactory.fetchWallets().then(function(response) {
    $scope.wallets = response.data.wallets;
    $scope.uniqueWalletNames = walletFactory.createUniqueWalletNamesArray(response.data.wallets);
  });

  $scope.viewSongsOfAll = function(walletName, event, wallets) {
    event.preventDefault();
    $scope.walletSongs = walletFactory.extractSongsFromClickedWallet(wallets, $scope.currentUser, walletName);
  };

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };

  $scope.hoverIn = function(walletName, event) {
    walletFactory.defineColor(walletName, event);
  };

  $scope.hoverOut = function(event) {
    $(event.delegateTarget).css("background-color", "#8e1e1e");
    $(event.delegateTarget).children().css("color", "white");
  };

  $scope.addToWallet = function(wallet, source) {
    var addedElement = $scope.walletSongs.filter(function(song) {return song.url === source})[0];
    var addedElementIndex = $scope.walletSongs.indexOf(addedElement);
    $scope.walletSongs.splice(addedElementIndex, 1);
    songFactory.addSong(wallet, source).then(function(response) {
      console.log("song added");
    });
  };
}]);