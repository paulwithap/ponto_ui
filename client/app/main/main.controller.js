'use strict';

angular.module('pontoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('http://localhost:3000/api/v1/customers').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });
