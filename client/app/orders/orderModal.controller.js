'use strict';

angular.module('pontoApp')
  .controller('OrderModalCtrl', function ($rootScope, $scope, $http, $log, $window, $modal, $modalInstance, order, API_BASE_URL) {
    $log.log('order');
    $log.log(order);
    $scope.order = order;
    $scope.order.order_products = $scope.order.order_products || [];
    // TODO: break these out into separate controllers
    $scope.addresses = [];
    $scope.orderTypes = [];

    // $scope.getOrderTypes = function() {
    //   $http.get(API_BASE_URL + '/order_types/')
    //     .success(function(data, status, headers, config) {
    //       $log.info('got order types');
    //       $log.log(data);
    //       $scope.orderTypes = data;
    //     })
    //     .error(function(data, status, headers, config) {
    //       $log.warn('error getting orderTypes');
    //       $log.log(data);
    //     });
    // };

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
        // .success(function(data, status, headers, config) {
        //   $log.info('got customers');
        //   $log.log(data);
        //   return data;
        // })
        // .error(function(data, status, headers, config) {
        //   $log.warn('error getting customers');
        //   $log.log(data);
        // });
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

    $rootScope.$on('PVQuickAdd.addVariantToOrder', function(event, variant) {
      $log.log('heard addVariantToOrder');
      $log.log(event);
      $log.log(variant);
      $scope.order.order_products.push(_.omit(variant, 'id'));
    });

    var init = function() {
      if ($scope.order.id) {
        $scope.getOrderInfo().then(function() {
          $scope.getCustomerInfo();
        });
      }
    };

    init();
  });
