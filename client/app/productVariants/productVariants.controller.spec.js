'use strict';

describe('Controller: ProductVariantsCtrl', function () {

  // load the controller's module
  beforeEach(module('pontoApp'));

  var ProductVariantsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductVariantsCtrl = $controller('ProductVariantsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
