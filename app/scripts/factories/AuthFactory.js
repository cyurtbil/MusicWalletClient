'use strict';

app.factory('authFactory', ['$http', 'ServerUrl', '$window', '$location', function($http, ServerUrl, $window, $location) {

  var connect = function() {
    return $http.get(ServerUrl + 'cloud/get_redirect_uri');
  };

  var getCurrentUser = function() {
    return $http.get(ServerUrl + 'users/get_current_user');
  };

  var createUserSession = function(response) {
    $window.sessionStorage.setItem('MusicWallet.user', response.data.current_user.token);
    setHeaderAuthorization();
  };

  var logout = function() {
    return $http.get(ServerUrl + 'logout').success(function(response) {
      $window.sessionStorage.removeItem('MusicWallet.user');
      $location.path('/');
    });
  };

  var isAuthenticated = function() {
    return !!$window.sessionStorage.getItem('MusicWallet.user');
  };

  var setHeaderAuthorization = function() {
    $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('MusicWallet.user');
  };

  return {
    connect: connect,
    createUserSession: createUserSession,
    logout: logout,
    isAuthenticated: isAuthenticated,
    setHeaderAuthorization: setHeaderAuthorization,
    getCurrentUser: getCurrentUser
  };
}]);