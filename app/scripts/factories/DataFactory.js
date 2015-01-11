'use strict';

app.factory('dataFactory', ['$http', 'ServerUrl', function($http, ServerUrl) {

  var fetchWallets = function() {
    return $http.get(ServerUrl + 'wallets.json');
  };

  return {
    fetchWallets: fetchWallets
  };
}]);