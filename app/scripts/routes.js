'use strict';

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when('/register', {
    templateUrl: 'templates/register.html'
  })
  .when('/login', {
    templateUrl: 'templates/login.html'
  })
  .when('/', {
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
    redirectTo: '/login'
  });
}]);