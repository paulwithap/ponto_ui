'use strict';

angular.module('pontoApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/',
        'show': true
      },
      {
        'title': 'Customers',
        'link': '/customers',
        'show': true
      },
      {
        'title': 'Products',
        'link': '/products',
        'show': true
      },
      {
        'title': 'Login',
        'link': '/login',
        'show': !Auth.isAuthenticated()
      },
      {
        'title': 'Logout',
        'link': '/logout',
        'show': Auth.isAuthenticated()
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
