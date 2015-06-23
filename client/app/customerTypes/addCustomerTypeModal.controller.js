'use strict';

angular.module('pontoApp')
  .controller('AddCustomerTypeModalCtrl', function ($scope, $http, $modalInstance, $log, API_BASE_URL) {
    $scope.customerType = {};

    $scope.save = function() {
      var reqBody = { customer_type: $scope.customerType };

      $http.post(API_BASE_URL + '/customer_types', reqBody)
        .success(function(data, status, headers, config) {
          $modalInstance.close(data);
        })
        .error(function(data, status, headers, config) {
          $log.warn('error saving customerType');
          $log.log(data);
        });
    };
  });
