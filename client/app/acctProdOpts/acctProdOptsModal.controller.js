'use strict';

angular.module('pontoApp')
  .controller('AcctProdOptsModalCtrl', function ($scope, $http, $modalInstance, $log, API_BASE_URL) {
    $scope.option = {};

    $scope.save = function() {
      var reqBody = { account_product_option: $scope.option };

      $http.post(API_BASE_URL + '/account_product_options', reqBody)
        .success(function(data, status, headers, config) {
          $modalInstance.close(data);
        })
        .error(function(data, status, headers, config) {
          $log.warn('error saving acctProdOpt');
          $log.log(data);
        });
    };
  });
