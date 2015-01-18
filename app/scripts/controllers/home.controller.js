'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  '$location',
                                  'dataFactory',
                                  'walletFactory',
                                  '$sce',
                                  'userFactory',
                                  function($scope, authFactory, $location, dataFactory, walletFactory, $sce, userFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  dataFactory.fetchWallets().then(function(response) {
    $scope.wallets = response.data.wallets;
    $scope.uniqueWalletNames = walletFactory.createUniqueWalletNamesArray(response.data.wallets);
  });

  $scope.viewSongsOfAll = function(walletName, event) {
    event.preventDefault();
    $scope.walletSongs = walletFactory.extractSongsFromClickedWallet($scope.wallets, $scope.currentUser, walletName);
  };

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };
}]);