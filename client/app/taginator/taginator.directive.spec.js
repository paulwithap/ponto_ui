'use strict';

describe('Directive: taginator', function () {

  // load the directive's module and view
  beforeEach(module('pontoApp'));
  beforeEach(module('app/taginator/taginator.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<taginator></taginator>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the taginator directive');
  }));
});