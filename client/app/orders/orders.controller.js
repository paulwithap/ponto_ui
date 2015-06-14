'use strict';

angular.module('pontoApp')
  .controller('OrdersCtrl', function ($scope, $http, $log, $modal) {
    $scope.getOrders = function() {
      $http.get('http://localhost:3000/api/v1/orders').success(function(response) {
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
    };

    var init = function() {
      $scope.getOrders();
    };

    init();
  });
