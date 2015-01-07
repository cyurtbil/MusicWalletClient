'use strict';

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'templates/connect.html'
  })
  .when('/home', {
    templateUrl: 'templates/home.html'
  })
  .when('/search', {
    templateUrl: 'templates/search.html'
  })
  .when('/who', {
    templateUrl: 'templates/who.html'
  })
  .when('/profile/:id', {
    templateUrl: 'templates/profile.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);