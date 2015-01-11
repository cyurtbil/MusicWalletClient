'use strict';

app.controller('HomeController', ['$scope',
                                  'authFactory',
                                  '$location',
                                  'dataFactory',
                                  'walletFactory',
                                  function($scope, authFactory, $location, dataFactory, walletFactory) {

  $(document).ready(function() {
    $('body').removeClass('bg');
  });

  dataFactory.fetchWallets().then(function(response) {
    $scope.uniqueWalletNames = walletFactory.createUniqueWalletNamesArray(response.data.wallets);
  });
}]);