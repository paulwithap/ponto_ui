'use strict';

angular.module('pontoApp')
  .controller('OrderModalCtrl', function ($rootScope, $scope, $http, $log, $window, $modal, $modalInstance, order, API_BASE_URL) {
    $log.log('order');
    $log.log(order);
    $scope.order = order;
    $scope.order.order_products = $scope.order.order_products || [];

    $scope.getOrderInfo = function() {
      return $http.get(API_BASE_URL + '/orders/' + $scope.order.id)
        .success(function(data, status, headers, config) {
          $scope.order = data;
        })
        .error(function(data, status, headers, config) {
          $log.warn('error getting order with id: ' + $scope.order.id);
          $log.log(data);
        });
    };

    $scope.getContacts = function() {
      $http.get(API_BASE_URL + '/customers/' + $scope.order.customer.id + '/customer_contacts')
        .success(function(data, status, headers, config) {
          $log.info('got contacts');
          $log.log(data);
          $scope.contacts = data;
        })
        .error(function(data, status, headers, config) {
          $log.warn('error getting contacts');
          $log.log(data);
        });
    };

    $scope.getCustomerInfo = function() {
      if ($scope.order.customer_id) {
        return $http.get(API_BASE_URL + '/customers/' + $scope.order.customer_id)
          .then(function(response) {
            $scope.order.customer = response.data;
            $log.log($scope.order);
          });
      }
    };

    $scope.getCustomers = function(searchVal) {
      return $http.get(API_BASE_URL + '/customers', {
        params: {
          search: searchVal
        }
      }).then(function(response) {
        $log.log('customers response');
        $log.log(response);
        return response.data;
      });
    };

    $scope.addProducts = function() {
      var productsModal = $modal.open({
        templateUrl: 'app/productVariants/productVariantsQuickAdd.html',
        controller: 'ProductVariantsQuickAddCtrl',
        size: 'md'
      });
    };

    $scope.addCustomerHandler = function(item, model, label) {
      $scope.order.customer = angular.copy(model);
      $scope.order.customer_id = model.id;
    };

    $scope.save = function() {
      $scope.order.order_products_attributes = $scope.order.order_products;

      var requestBody = { order: $scope.order };

      if ($scope.order.id) {
        $http.put(API_BASE_URL + '/orders/' + $scope.order.id, requestBody)
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
        $http.post(API_BASE_URL + '/orders', requestBody)
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

    $scope.recalculateTotals = function() {
      $scope.order.subtotal = $scope.order.subtotal || 0;
      $scope.order.total = $scope.order.total || 0;
      _.each($scope.order.order_products, function(orderProduct) {
        $scope.order.subtotal += orderProduct.price * orderProduct.quantity;
      });
      $scope.order.total = $scope.order.subtotal;
    };

    $rootScope.$on('PVQuickAdd.addVariantToOrder', function(event, variant) {
      $log.log('heard addVariantToOrder');
      $log.log(event);
      $log.log(variant);
      // order_product.id != order_product.product_variant_id
      variant.product_variant_id = variant.id;
      $scope.order.order_products.push(_.omit(variant, 'id'));
      $scope.recalculateTotals();
    });

    var init = function() {
      if ($scope.order.id) {
        return $scope.getOrderInfo();
      }
    };

    init();
  });
