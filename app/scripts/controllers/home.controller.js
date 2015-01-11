'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  '$location',
                                  'dataFactory',
                                  function($scope, authFactory, $location, dataFactory) {

  $(document).ready(function() {
    $('body').removeClass('bg');
  });

  dataFactory.fetchWallets().then(function(response) {
    var wallets = response.data.wallets;
    var walletNames = [];
    for(var i = 0; i < wallets.length; i++) {
      walletNames.push(wallets[i].name);
    };

    $scope.uniqueWalletNames = $.unique(walletNames);
  });
}]);