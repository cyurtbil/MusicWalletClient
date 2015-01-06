'use strict';

app.factory('authFactory', ['$http', 'ServerUrl', function($http, ServerUrl) {


  var login = function() {
    return $http.get(ServerUrl + 'cloud/get_redirect_uri');
  };

  return {
    login: login
  };
}]);