'use strict';

angular.module('pontoApp')
  .controller('ProductsCtrl', function ($scope, $http, $log, $modal) {
    $scope.products = [];

    var init = function() {
      $scope.getProducts();
    };

    $scope.getProducts = function() {
      $http.get('http://localhost:3000/api/v1/products').success(function(response) {
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

    init();
  });
