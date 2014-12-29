'use strict';

angular.module('pontoApp')
  .controller('CustomerModalCtrl', function ($scope, $http, $log, $window, $modalInstance, customer, API_BASE_URL) {
    $log.log('customer');
    $log.log(customer);
    $scope.customer = customer;
    // TODO: break these out into separate controllers
    $scope.addresses = [];
    $scope.customerTypes = [];

    var init = function() {
      if ($scope.customer.id) {
        $scope.getAddresses();
      } else {
        $scope.addresses.push({});
      }

      $scope.getCustomerTypes();
    };

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

    $scope.getAddresses = function() {
      $http.get(API_BASE_URL + '/customers/' + $scope.customer.id + '/customer_addresses')
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

    $scope.deleteAddress = function(address) {
      if (address.id) {
        $http.delete(API_BASE_URL + '/customers/' + $scope.customer.id + '/customer_addresses/' + address.id)
          .success(function(data, status, headers, config) {
            $log.info('deleted address');
            _.pull($scope.addresses, address);
          })
          .error(function(data, status, headers, config) {
            $window.alert('Error deleting address.');
          });
      } else {
        _.pull($scope.addresses, address);
      }
    };

    $scope.save = function() {
      $scope.customer.customer_addresses_attributes = $scope.addresses;

      var requestBody = { customer: $scope.customer };

      if ($scope.customer.id) {
        $http.put(API_BASE_URL + '/customers/' + $scope.customer.id, requestBody)
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
        $http.post(API_BASE_URL + '/customers', requestBody)
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
