'use strict';

describe('Controller: AcctprodoptsCtrl', function () {

  // load the controller's module
  beforeEach(module('pontoApp'));

  var AcctprodoptsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AcctprodoptsCtrl = $controller('AcctprodoptsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
