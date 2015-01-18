'use strict';

app.controller('ProfileController', ['$scope',
                                     'dataFactory',
                                     'userFactory',
                                     'walletFactory',
                                     '$sce',
                                     function($scope, dataFactory, userFactory, walletFactory, $sce) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.findCurrentUser(response.data.users);
  });

  $scope.viewSongs = function(wallet) {
    $('h1').show(500);
    walletFactory.getWallet(wallet).then(function(response) {
      $scope.wallet = response.data;
      $scope.walletSongs = response.data.songs;
    });
  }; 

  $scope.fixUrl = function(source) {
    return $sce.trustAsResourceUrl(source);
  };

}]);