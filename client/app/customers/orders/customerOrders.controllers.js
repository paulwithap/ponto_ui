'use strict';

angular.module('pontoApp')
  .controller('CustomerOrdersCtrl', function ($scope, $rootScope, $http, $stateParams, API_BASE_URL) {
    // $scope.customer is inherited from parent controller
    console.log('orders');
    console.log($stateParams);
    $scope.getOrders = function() {
      $http.get(API_BASE_URL + '/orders', {
        params: {
          customer_id: $stateParams.customerId
        }
      }).success(function(response) {
        $scope.orders = response;
      });
    };

    var init = function() {
      $scope.getOrders();
    };

    init();
  });
