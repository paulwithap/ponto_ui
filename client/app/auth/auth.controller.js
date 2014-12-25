'use strict';

angular.module('pontoApp')
  .controller('AuthCtrl', function ($scope, $http, $state, $rootScope, $timeout, Auth) {
    $scope.referrer = 'main';

    var init = function() {
      if ($state.current.name === 'logout') {
        $scope.logout();
      } else if ($state.current.name === 'login') {
        if (Auth.isAuthenticated()) {
          $state.go($scope.referrer);
        }
      }
    };

    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        Auth.login($scope.user)
          .then(function(response) {
            $state.go($scope.referrer);
          }, function(reason) {
          });
      } else {
        console.log('the form fucked up');
      }
    };

    $scope.logout = function() {
      Auth.logout();
      $scope.isLoggedOut = true;
      $timeout(function() {
        $state.go('login');
      }, 3000);
    };

    init();
  });
