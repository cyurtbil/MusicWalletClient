'use strict';

app.controller('ConnectController', ['$scope',
                                     'authFactory',
                                     '$http',
                                     'ServerUrl',
                                     '$window',
                                     'dataFactory',
                                     'userFactory',
                                     function($scope, authFactory, $http, ServerUrl, $window, dataFactory, userFactory) {


  $(document).ready(function() {
    $('body').addClass('bg');
  });

  
}]);