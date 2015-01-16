'use strict';

app.factory('userFactory', ['$window', '$http', 'ServerUrl', function($window, $http, ServerUrl) {

  var findCurrentUser = function(users) {
    var token =  getToken();

    return users.filter(function(user) {return user.token === token;})[0];
  };

  var getToken = function() {
    return $window.sessionStorage.getItem('MusicWallet.user');
  };

  var registerUser = function(userParams) {
    return $http.post(ServerUrl + 'users.json', userParams);
  };

  return {
    findCurrentUser: findCurrentUser,
    registerUser: registerUser
  };
}]);