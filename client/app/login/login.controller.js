'use strict';

angular.module('pontoApp')
  .controller('LoginCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        $http.post('http://localhost:3000/auth', $scope.user)
          .success(function(data, status, headers, config) {
            console.log('success');
            console.log(data);
          })
          .error(function(data, status, headers, config) {
            console.log('error');
            console.log(data)
          });
      } else {
        console.log('the form fucked up');
      }
    };
  });
