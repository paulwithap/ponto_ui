'use strict';

angular.module('pontoApp')
  .controller('ProductVariantsQuickAddCtrl', function ($rootScope, $scope, $http, $modalInstance, $log, API_BASE_URL) {
    $scope.variants = [];

    $scope.getVariants = function() {
      $http.get(API_BASE_URL + '/product_variants/')
        .success(function(data, status, headers, config) {
          $log.info('got variants');
          $log.log(data);
          return $scope.variants = data;
        })
        .error(function(data, status, headers, config) {
          $log.warn('error getting variants');
          $log.log(data);
        });
    };

    $scope.addVariantToOrder = function(variant) {
      $log.log('adding variant to order');
      $log.log(variant);
      $rootScope.$emit('PVQuickAdd.addVariantToOrder', variant);
    };

    $scope.done = function() {
      $modalInstance.close();
    };

    var init = function() {
      $scope.getVariants();
    };

    init();
  });
