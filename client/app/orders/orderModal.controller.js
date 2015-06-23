'use strict';

angular.module('pontoApp')
  .controller('OrderModalCtrl', function ($rootScope, $scope, $http, $log, $window, $modal, $modalInstance, order, API_BASE_URL) {
    $log.log('order');
    $log.log(order);
    $scope.order = order;
    $scope.orderProducts = [];
    // TODO: break these out into separate controllers
    $scope.addresses = [];
    $scope.orderTypes = [];

    var init = function() {
      // if ($scope.order.id) {
      //   $scope.getAddresses();
      //   $scope.getContacts();
      // }

      // $scope.getOrderTypes();
    };

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
      $scope.order.order_addresses_attributes = $scope.addresses;
      $scope.order.order_contacts_attributes = $scope.contacts;

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
      $scope.orderProducts.push(variant);
    });

    init();
  });
