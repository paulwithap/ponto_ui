'use strict';

angular.module('pontoApp')
  .controller('ProductModalCtrl', function ($scope, $http, $log, $window, $modalInstance, product, API_BASE_URL) {
    $log.log('product');
    $log.log(product);
    $scope.product = product;
    // TODO: break these out into separate controllers
    $scope.variants = [];
    $scope.customerTypes = [];

    var init = function() {
      if ($scope.product.id) {
        $scope.getVariants();
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

    $scope.addVariant = function() {
      $scope.variants.push({});
    };

    $scope.getVariants = function() {
      $http.get(API_BASE_URL + '/products/' + $scope.product.id + '/product_variants')
        .success(function(data, status, headers, config) {
          $log.info('got variants');
          $log.log(data);
          $scope.variants = data;
        })
        .error(function(data, status, headers, config) {
          $log.warn('error getting variants');
          $log.log(data);
        });
    };

    $scope.deleteVariant = function(contact) {
      if (contact.id) {
        $http.delete(API_BASE_URL + '/products/' + $scope.product.id + '/product_variants/' + contact.id)
          .success(function(data, status, headers, config) {
            $log.info('deleted contact');
            _.pull($scope.variants, contact);
          })
          .error(function(data, status, headers, config) {
            $window.alert('Error deleting contact.');
          });
      } else {
        _.pull($scope.variants, contact);
      }
    };

    $scope.save = function() {
      $log.log('variants');
      $log.log($scope.variants);

      $scope.product.product_variants_attributes = $scope.variants;

      var requestBody = { product: $scope.product };

      if ($scope.product.id) {
        $http.put(API_BASE_URL + '/products/' + $scope.product.id, requestBody)
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
        $http.post(API_BASE_URL + '/products', requestBody)
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
