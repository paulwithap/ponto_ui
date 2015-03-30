'use strict';

angular.module('pontoApp')
  .controller('ProductModalCtrl', function ($scope, $http, $log, $window, $modalInstance, $modal, product, API_BASE_URL) {
    $log.log('product');
    $log.log(product);
    $scope.product = product;
    // TODO: break these out into separate controllers
    $scope.variants = [];
    $scope.customerTypes = [];
    $scope.productOptions = [{}];

    var init = function() {
      if ($scope.product.id) {
        $scope.getVariants();
      }

      $scope.getCustomerTypes();
      $scope.getAcctProdOpts();
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

    // VARIANTS

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

    $scope.generateVariants = function() {
      var option = $scope.productOptions[0],
          remainingOpts = _.without($scope.productOptions, option),
          tempVariants = [];

      _.forEach(option.values, function(value) {
        var baseSku = $scope.product.sku || $scope.product.name.substr(0, 3);

        if (remainingOpts.length && remainingOpts[0].values.length) {
          _.forEach(remainingOpts, function(opt, idx) {
            _.forEach(opt.values, function(val) {
              var variant = {
                name: value.text,
                sku: baseSku + '-' + value.text.substr(0, 3),
                weight: $scope.product.weight || 0,
                description: $scope.product.description || '',
                option1: value.text
              };
              variant.name += ' / ' + val.text;
              variant.sku += '-' + val.text.substr(0, 3);
              variant['option' + (idx + 1)] = val.text;
              tempVariants.push(variant);

            });
          });
        } else {
          var variant = {
            name: value.text,
            sku: baseSku + '-' + value.text.substr(0, 3),
            weight: $scope.product.weight || 0,
            description: $scope.product.description || '',
            option1: value.text
          };

          tempVariants.push(variant);
        }
      });

      $scope.variants = tempVariants;
    };

    $scope.removeVariants = function(option) {

    };

    $scope.addProductOption = function() {
      $scope.productOptions.push({});
    };

    $scope.getAcctProdOpts = function() {
      $http.get(API_BASE_URL + '/account_product_options')
        .success(function(data, status, headers, config) {
          $log.info('got acct prod opts');
          $log.log(data);
          $scope.acctProdOpts = data;
        })
        .error(function(data, status, headers, config) {
          $log.warn('error getting acct prod opts');
          $log.log(data);
        });
    };

    $scope.newAcctProdOpt = function() {
      var optsModal = $modal.open({
        templateUrl: 'acctProdOptsModal.html',
        controller: 'AcctProdOptsModalCtrl',
        size: 'small'
      });

      optsModal.result.then(function(newOpt) {
        $scope.getAcctProdOpts();
      }, function() {
        $log.info('acctProdOptsModal dismissed');
      });
    };

    $scope.onAcctProdOptChange = function(option) {
      $log.log('onAcctProdOptChange');
      if (option.name === 'new') {
        $scope.newAcctProdOpt();
      } else {
        $scope.generateVariants();
      }
    };

    $scope.onTagAdded = function($tag, optName) {
      $scope.generateVariants();
    };

    $scope.onTagRemoved = function($tag) {
      $scope.generateVariants();
    };

    // $scope.getOptions = function() {
    //   $http.get(API_BASE_URL + '/products/' + $scope.product.id + '/product_options')
    //     .success(function(data, status, headers, config) {
    //       $log.info('got productOptions');
    //       $log.log(data);
    //       $scope.productOptions = data;
    //     })
    //     .error(function(data, status, headers, config) {
    //       $log.warn('error getting productOptions');
    //       $log.log(data);
    //     });
    // };

    $scope.save = function() {
      $log.log('variants');
      $log.log($scope.variants);

      $scope.product.product_variants_attributes = $scope.variants;
      $scope.product.product_options_attributes = $scope.productOptions;

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
