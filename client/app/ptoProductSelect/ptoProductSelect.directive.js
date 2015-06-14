'use strict';

angular.module('pontoApp')
  .directive('ptoProductSelect', function () {
    return {
      templateUrl: 'app/ptoProductSelect/ptoProductSelect.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });