'use strict';

app.factory('authFactory', ['$http', 'ServerUrl', '$window', '$location', function($http, ServerUrl, $window, $location) {

  var createUserSession = function(response) {
    $window.sessionStorage.setItem('MusicWallet.user', response.token);
    setHeaderAuthorization();
  };

  var logout = function() {
    return $http.get(ServerUrl + 'logout');
  };

  var isAuthenticated = function() {
    return !!$window.sessionStorage.getItem('MusicWallet.user');
  };

  var setHeaderAuthorization = function() {
    $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('MusicWallet.user');
  };

  var login = function(user) {
    return $http.post(ServerUrl + 'login', user);
  };

  return {
    createUserSession: createUserSession,
    logout: logout,
    isAuthenticated: isAuthenticated,
    setHeaderAuthorization: setHeaderAuthorization,
    login: login
  };
}]);