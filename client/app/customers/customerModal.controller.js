'use strict';

angular.module('pontoApp')
  .controller('CustomerModalCtrl', function ($scope, $http, $log, $modalInstance, customer) {
    $log.log('customer');
    $log.log(customer);
    $scope.customer = customer;

    $scope.save = function() {
      if ($scope.customer.id) {
        $http.put('http://localhost:3000/api/v1/customers/' + $scope.customer.id, $scope.customer)
          .success(function(data, status, headers, config) {
            $log.info('success!');
            $log.log(data);
            $modalInstance.close(data);
          })
          .error(function(data, status, headers, config) {
            $log.warn('error!');
            $log.log(data);
          });
      } else {
        $http.post('http://localhost:3000/api/v1/customers', $scope.customer)
          .success(function(data, status, headers, config) {
            $log.info('success!');
            $log.log(data);
            $modalInstance.close(data);
          })
          .error(function(data, status, headers, config) {
            $log.warn('error!');
            $log.log(data);
          });
      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
