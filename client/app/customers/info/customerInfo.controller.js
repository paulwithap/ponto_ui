'use strict';

angular.module('pontoApp')
  .controller('CustomerInfoCtrl', function ($scope, $rootScope, $http, API_BASE_URL, $log) {
    $scope.getCustomerTypes = function() {
      $http.get(API_BASE_URL + '/customer_types/')
        .success(function(data, status, headers, config) {
          $log.info('got customer types');
          $log.log(data);
          $scope.customerTypes = data;
        })
        .error(function(data, status, headers, config) {
          $log.warn('error getting customerTypes');
          $log.log(data);
        });
    };

    var init = function() {
      $scope.getCustomerTypes();
    };

    init();
  });
