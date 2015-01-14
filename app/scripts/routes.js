'use strict';

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'templates/connect.html'
  })
  .when('/home/:username', {
    templateUrl: 'templates/home.html'
  })
  .when('/search/:username', {
    templateUrl: 'templates/search.html'
  })
  .when('/who/:username', {
    templateUrl: 'templates/who.html'
  })
  .when('/profile/:username', {
    templateUrl: 'templates/profile.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);