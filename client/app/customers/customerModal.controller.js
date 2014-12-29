'use strict';

angular.module('pontoApp')
  .controller('CustomerModalCtrl', function ($scope, $http, $log, $modalInstance, customer) {
    $log.log('customer');
    $log.log(customer);
    $scope.customer = customer;
    $scope.addresses = [];

    var init = function() {
      if ($scope.customer.id) {
        $scope.getAddresses();
      } else {
        $scope.addresses.push({});
      }
    };

    $scope.getAddresses = function() {
      $http.get('http://localhost:3000/api/v1/customers/' + $scope.customer.id + '/customer_addresses')
        .success(function(data, status, headers, config) {
          $log.info('got addresses');
          $log.log(data);
          $scope.addresses = data;
          $scope.addresses.push({});
        })
        .error(function(data, status, headers, config) {
          $log.warn('error getting addresses');
          $log.log(data);
        });
    };

    $scope.save = function() {
      $scope.customer.customer_addresses_attributes = $scope.addresses;

      var requestBody = { customer: $scope.customer };

      if ($scope.customer.id) {
        $http.put('http://localhost:3000/api/v1/customers/' + $scope.customer.id, requestBody)
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
        $http.post('http://localhost:3000/api/v1/customers', requestBody)
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

    init();
  });
