'use strict';

app.factory('authFactory', ['$http', 'ServerUrl', '$window', function($http, ServerUrl, $window) {


  var login = function() {
    return $http.get(ServerUrl + 'cloud/get_redirect_uri');
  };

  var createUserSession = function() {
    return $http.get(ServerUrl + 'users/get_current_user').success(function(response) {
        debugger
        $window.sessionStorage.setItem('MusicWallet.user', response.current_user.token);
        $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('MusicWallet.user');
      });
  };

  return {
    login: login,
    createUserSession: createUserSession
  };
}]);