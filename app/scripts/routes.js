'use strict';

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'templates/login.html'
  })
  .when('/home', {
    templateUrl: 'templates/home.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);