'use strict';

angular.module('pontoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('productVariants', {
        url: '/productVariants',
        templateUrl: 'app/productVariants/productVariants.html',
        controller: 'ProductVariantsCtrl'
      });
  });