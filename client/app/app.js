'use strict';
var SERVER_URL = 'http://localhost:5000',
    AUTH_URL = SERVER_URL + '/auth',
    API_BASE_URL = SERVER_URL + '/api/v1';

angular.module('pontoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngTagsInput',
  'ngFileUpload'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .constant('API_BASE_URL', API_BASE_URL)
  .constant('AUTH_URL', AUTH_URL);
