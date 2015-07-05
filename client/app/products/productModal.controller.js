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

    // var recur = function(vari, opts, k) {
    //   if (k === opts.length) {
    //     vari.name += ' / ' + val.text;
    //     vari.sku += '-' + val.text.substr(0, 3);
    //     vari['option' + (idx + 1)] = val.text;
    //     tempVars.push(vari);
    //   } else {
    //     for(var i = 0; i < opts[k].values.length; i++) {
    //       vari.name += opts[k]
    //       recur()
    //     }
    //   }
    // };

    var tempVars = [];
    var options = [{name: 'size', values: ['small', 'medium', 'large']}, {name: 'color', values: ['black', 'red']}, {name: 'mat', values: ['cotton', 'hemp']}];


    $scope.generateVariants = function() {
      var tempVariants = [],
          baseSku = $scope.product.sku || $scope.product.name.substr(0, 3);

      function recurse(name, sku, attrs, k) {
        if(k === attrs.length) {
          var variant = {
            name: $scope.product.name + ' - ' + name,
            sku: sku,
            weight: $scope.product.weight || 0,
            description: $scope.product.description || ''
          };
          tempVariants.push(variant);
        } else {
            for(var i = 0; i < attrs[k].values.length; i++) {
              var newName = name.length ? name + ' ' + '/' + ' ' + attrs[k].values[i].text : attrs[k].values[i].text,
                  newSku = sku.length ? sku + '-' + attrs[k].values[i].text.substr(0,3) : attrs[k].values[i].text.substr(0,3);

              recurse(newName, newSku, attrs, k+1);
            }
        }
      }

      recurse('', baseSku, $scope.productOptions, 0);

      // catch new option with no values
      if (tempVariants.length) {
        $scope.variants = tempVariants;
      }
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

    $scope.onImageAdded = function($file, $event, $flow) {
      $event.preventDefault();

      $http.get(API_BASE_URL + '/products/image_upload_key')
        .success(function(data, status, headers, config) {
          console.log('got image upload key');
          console.log(data);
        })
        .error(function(data, status, headers, config) {
          console.error('GET image upload key failed');
        });
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
