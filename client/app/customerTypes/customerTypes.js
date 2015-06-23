'use strict';

angular.module('pontoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customerTypes', {
        url: '/customerTypes',
        templateUrl: 'app/customerTypes/customerTypes.html',
        controller: 'CustomerTypesCtrl'
      });
  });