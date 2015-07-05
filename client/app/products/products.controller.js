'use strict';

angular.module('pontoApp')
  .controller('ProductsCtrl', function ($scope, $http, $log, $modal, API_BASE_URL) {
    $scope.products = [];

    $scope.getProducts = function() {
      $http.get(API_BASE_URL + '/products').success(function(response) {
        $scope.products = response;
      });
    };

    $scope.openModal = function(selectedProduct) {
      selectedProduct = selectedProduct || {};
      $log.log('selectedProduct');
      $log.log(selectedProduct);
      var modalInstance = $modal.open({
        templateUrl: 'app/products/productModal.html',
        controller: 'ProductModalCtrl',
        size: 'lg',
        resolve: {
          product: function() {
            return selectedProduct;
          }
        }
      });

      modalInstance.result.then(function(product) {
        // refresh the list
        $scope.getProducts();
      }, function() {
        $log.info('Modal dismissed.');
      });
    };

    var init = function() {
      $scope.getProducts();
    };

    init();
  });
