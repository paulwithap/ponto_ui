'use strict';

angular.module('pontoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller: 'AuthCtrl'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/auth/logout.html',
        controller: 'AuthCtrl'
      });
  });
