'use strict';

describe('Controller: CustomerTypesCtrl', function () {

  // load the controller's module
  beforeEach(module('pontoApp'));

  var CustomerTypesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomerTypesCtrl = $controller('CustomerTypesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
