'use strict';

app.factory('dataFactory', ['$http', 'ServerUrl', function($http, ServerUrl) {

  var fetchWallets = function() {
    return $http.get(ServerUrl + 'wallets.json');
  };

  var fetchTracksFromCloud = function(input) {
    return $http.post(ServerUrl + 'cloud/get_tracks', input);
  };

  return {
    fetchWallets: fetchWallets,
    fetchTracksFromCloud: fetchTracksFromCloud
  };
}]);