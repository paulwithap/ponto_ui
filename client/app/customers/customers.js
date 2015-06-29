'use strict';

angular.module('pontoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customers', {
        url: '/customers',
        templateUrl: 'app/customers/customers.html',
        controller: 'CustomersCtrl'
      })
      .state('customer', {
        url: '/customers/:customerId',
        templateUrl: 'app/customers/customer.html',
        controller: 'CustomerCtrl'
      })
      .state('customer.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/customers/dashboard/customerDashboard.html',
        controller: 'CustomerDashboardCtrl'
      });
      .state('customer.orders', {
        url: '/orders',
        templateUrl: 'app/customers/orders/customerOrders.html',
        controller: 'CustomerDashboardCtrl'
      });
  });
