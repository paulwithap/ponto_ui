'use strict';

angular.module('pontoApp')
  .controller('CustomerCtrl', function ($scope, $rootScope, $http, API_BASE_URL, $stateParams) {
    $scope.getCustomer = function() {
      $http.get(API_BASE_URL + '/customers/' + $stateParams.customerId)
        .then(function(response) {
          $scope.customer = response.data;
        });
    };

    var init = function() {
      $scope.getCustomer();
    };

    init();

    $rootScope.$on('stateChangeStart', function(evt, toState, toParams) {
      console.log('stateChangeStart');
      console.log(evt);
      console.log(toState);
      console.log(toParams);
    });
  });
