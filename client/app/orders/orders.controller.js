'use strict';

angular.module('pontoApp')
  .controller('OrdersCtrl', function ($scope, $http, $log, $modal, API_BASE_URL) {
    $scope.getOrders = function() {
      $http.get(API_BASE_URL + '/orders', {
        params: {
          includes: 'customer'
        }
      }).success(function(response) {
        $scope.orders = response;
      });
    };

    $scope.openModal = function(selectedOrder) {
      selectedOrder = selectedOrder || {};
      $log.log('selectedOrder');
      $log.log(selectedOrder);
      var modalInstance = $modal.open({
        templateUrl: 'app/orders/orderModal.html',
        controller: 'OrderModalCtrl',
        size: 'lg',
        resolve: {
          order: function() {
            return selectedOrder;
          }
        }
      });

      modalInstance.result.then(function(order) {
        $scope.getOrders();
      }, function() {
        $log.info('Modal dismissed.');
      })
    };

    var init = function() {
      $scope.getOrders();
    };

    init();
  });
