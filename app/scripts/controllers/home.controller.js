'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  '$location',
                                  'dataFactory',
                                  'walletFactory',
                                  '$sce',
                                  'userFactory',
                                  'songFactory',
                                  'colorService',
                                  function($scope, authFactory, $location, dataFactory, walletFactory, $sce, userFactory, songFactory, colorService) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  dataFactory.fetchWallets().then(function(response) {
    $scope.wallets = response.data.wallets;
    $scope.uniqueWalletNames = walletFactory.createUniqueWalletNamesArray(response.data.wallets);
  });

  $scope.selected = false;

  $scope.viewSongsOfAll = function(walletName, event, wallets) {
    event.preventDefault();
    $scope.selected = true;
    $scope.walletSongs = walletFactory.extractSongsFromClickedWallet(wallets, $scope.currentUser, walletName);
  };

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };

  $scope.hoverIn = function(walletName, event) {
    colorService.defineColor(walletName, event.delegateTarget);
  };

  $scope.hoverOut = function(event) {
    $(event.delegateTarget).css("background-color", "#8e1e1e");
    $(event.delegateTarget).children().css("color", "white");
  };

  $scope.addToWallet = function(wallet, source) {
    songFactory.addSong(wallet, source).then(function(response) {
      var addedElement = $scope.walletSongs.filter(function(song) {return song.url === source})[0];
      var addedElementIndex = $scope.walletSongs.indexOf(addedElement);
      $scope.walletSongs.splice(addedElementIndex, 1);
    });
  };
}]);