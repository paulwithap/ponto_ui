'use strict';

angular.module('pontoApp')
  .controller('OrderModalCtrl', function ($scope, $http, $log, $window, $modalInstance, order, API_BASE_URL) {
    $log.log('order');
    $log.log(order);
    $scope.order = order;
    // TODO: break these out into separate controllers
    $scope.addresses = [];
    $scope.orderTypes = [];

    $scope.testCustomers = [{"id":6,"name":"Test 2","resale_license":null,"tax_id":null,"website":"www.test2.com","notes":"test 2222","account_id":1,"customer_account_id":null,"customer_type_id":null,"url":"http://localhost:3000/api/v1/customers/6"},{"id":7,"name":"Should Work","resale_license":"0293843","tax_id":"2039432","website":"www.shouldwork.com","notes":"oh yeah","account_id":1,"customer_account_id":null,"customer_type_id":null,"url":"http://localhost:3000/api/v1/customers/7"},{"id":5,"name":"Jeans CO","resale_license":"234234","tax_id":"235134","website":"www.jeansco.com","notes":"Terrible jeans. Do not buy.","account_id":1,"customer_account_id":null,"customer_type_id":1,"url":"http://localhost:3000/api/v1/customers/5"},{"id":1,"name":"Bob's Burgers","resale_license":"432093","tax_id":"23049322","website":"www.bobsburgers.com","notes":"ayy lmao","account_id":1,"customer_account_id":null,"customer_type_id":1,"url":"http://localhost:3000/api/v1/customers/1"},{"id":10,"name":"Nana's Vape Shop","resale_license":"203948","tax_id":"20459080","website":"www.nanasvapeshop.com","notes":null,"account_id":1,"customer_account_id":null,"customer_type_id":1,"url":"http://localhost:3000/api/v1/customers/10"},{"id":9,"name":"Fake Guy","resale_license":"203948","tax_id":"2039847","website":"www.fakeguy.com","notes":"This guy is totally fake.","account_id":1,"customer_account_id":null,"customer_type_id":1,"url":"http://localhost:3000/api/v1/customers/9"}];

    var init = function() {
      // if ($scope.order.id) {
      //   $scope.getAddresses();
      //   $scope.getContacts();
      // }

      // $scope.getOrderTypes();
    };

    // $scope.getOrderTypes = function() {
    //   $http.get(API_BASE_URL + '/order_types/')
    //     .success(function(data, status, headers, config) {
    //       $log.info('got order types');
    //       $log.log(data);
    //       $scope.orderTypes = data;
    //     })
    //     .error(function(data, status, headers, config) {
    //       $log.warn('error getting orderTypes');
    //       $log.log(data);
    //     });
    // };

    $scope.getContacts = function() {
      $http.get(API_BASE_URL + '/customers/' + $scope.order.customer.id + '/customer_contacts')
        .success(function(data, status, headers, config) {
          $log.info('got contacts');
          $log.log(data);
          $scope.contacts = data;
        })
        .error(function(data, status, headers, config) {
          $log.warn('error getting contacts');
          $log.log(data);
        });
    };

    $scope.getCustomers = function(searchVal) {
      return $http.get(API_BASE_URL + '/customers', {
        params: {
          search: searchVal
        }
      }).then(function(response) {
        $log.log('customers response');
        $log.log(response);
        return response.data;
      });
        // .success(function(data, status, headers, config) {
        //   $log.info('got customers');
        //   $log.log(data);
        //   return data;
        // })
        // .error(function(data, status, headers, config) {
        //   $log.warn('error getting customers');
        //   $log.log(data);
        // });
    };

    $scope.addCustomerHandler = function(item, model, label) {
      $scope.order.customer = angular.copy(model);
      $scope.order.customer_id = model.id;
    };

    $scope.save = function() {
      $scope.order.order_addresses_attributes = $scope.addresses;
      $scope.order.order_contacts_attributes = $scope.contacts;

      var requestBody = { order: $scope.order };

      if ($scope.order.id) {
        $http.put(API_BASE_URL + '/orders/' + $scope.order.id, requestBody)
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
        $http.post(API_BASE_URL + '/orders', requestBody)
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
