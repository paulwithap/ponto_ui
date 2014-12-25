'use strict';
/**
* @ngdoc factory
* @name pontoApp.factory:Auth
* @function
*
* @description
* provides interface for getting/setting auth tokens,
* logging in/out, and checking authentication
*
* **Note:** Breaks support for IE 7 and below due to local storage usage
*/

angular.module('pontoApp')
  .factory('Auth', function(Storage, $q, $http) {
    // Service logic
    // ...

    // Public API here
    return {
      isAuthenticated: function() {
        return !!(Storage.get('auth_token'));
      },
      setToken: function(token) {
        Storage.set('auth_token', token);
      },
      getToken: function() {
        Storage.get('auth_token');
      },
      login: function(credentials) {
        var self = this;
        var deferred = $q.defer();
        $http.post('http://localhost:3000/auth', credentials)
          .success(function(data, status, headers, config) {
            self.setToken(data.token);
            deferred.resolve(data);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });

        return deferred.promise;
      },
      logout: function() {
        Storage.clear('auth_token');
      }
    };
  })
  .factory('AuthInterceptor', function($q, $injector) {
    var Storage = $injector.get('Storage');

    return {
      request: function(config) {
        var token;
        if (Storage.get('auth_token')) {
          token = Storage.get('auth_token');
        }
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          Storage.clear('auth_token');
          $injector.get('$state').go('login');
        }
        return $q.reject(response);
      }
    };
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });;
