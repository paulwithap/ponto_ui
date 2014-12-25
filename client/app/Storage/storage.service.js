'use strict';

angular.module('pontoApp')
  .factory('Storage', function () {
    // Service logic
    // ...

    // Public API here
    return {
      get: function(key) {
        return localStorage.getItem(key);
      },
      set: function(key, val) {
        return localStorage.setItem(key, val);
      },
      clear: function(key) {
        return localStorage.removeItem(key);
      }
    };
  });
