'use strict';

angular.module('pontoApp')
  .controller('CustomersCtrl', function ($scope, $log, $http, $modal) {
    $scope.customers = [];

    var init = function() {
      $scope.getCustomers();
    };

    $scope.getCustomers = function() {
      $http.get('http://localhost:3000/api/v1/customers').success(function(response) {
        $scope.customers = response;
      });
    };

    $scope.openModal = function(selectedCustomer) {
      selectedCustomer = selectedCustomer || {};
      $log.log('selectedCustomer');
      $log.log(selectedCustomer);
      var modalInstance = $modal.open({
        templateUrl: 'app/customers/customerModal.html',
        controller: 'CustomerModalCtrl',
        size: 'lg',
        resolve: {
          customer: function() {
            return selectedCustomer;
          }
        }
      });

      modalInstance.result.then(function(customer) {
        // refresh the list
        $scope.getCustomers();
      }, function() {
        $log.info('Modal dismissed.');
      });
    };

    init();
  });
