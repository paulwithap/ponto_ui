'use strict';

describe('Directive: ptoProductSelect', function () {

  // load the directive's module and view
  beforeEach(module('pontoApp'));
  beforeEach(module('app/ptoProductSelect/ptoProductSelect.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pto-product-select></pto-product-select>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ptoProductSelect directive');
  }));
});