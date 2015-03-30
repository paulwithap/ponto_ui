'use strict';

angular.module('pontoApp')
  .directive('taginator', function () {
    return {
      templateUrl: 'app/taginator/taginator.html',
      restrict: 'EA',
      scope: {
        list: '='
      },
      link: function (scope, element, attrs) {
        element.on('keydown', function(evt) {
          if (evt.keyCode === 188 && scope.list.length) {
            scope.model = scope.list.substring(0, scope.list.length);
            console.log(scope.model);
          }
        })

        scope.$emit('taginator.tagged', {model: scope.model});
      }
    };
  });
