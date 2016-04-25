(function () {
  'use strict';

  angular
    .module('emppanda')
    .controller('VendorController', VendorController);

  VendorController.$inject = ['$scope', '$state', 'vendorResolve', 'Authentication'];

  function VendorController($scope, $state, vendor, Authentication) {
    var vm = this;

    vm.vendor = vendor;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    
    var menu = [{itemname:"Pizza", category:"Veg", rate:400, quantity: 0},
    			{itemname:"Aloo Paratha", category:"Veg", rate:200, quantity: 0},
    			{itemname:"Thali", category:"Non-Veg", rate:300, quantity: 0},	
    			{itemname:"Egg Curry", category:"Non-Veg", rate:100, quantity: 0},
    			{itemname:"Fried Rice", category:"Veg", rate:150, quantity: 0},
    			{itemname:"Noodles", category:"Veg", rate:250, quantity: 0}];
    			
    vm.vendor.menu = menu;	
    vm.vendor.phonenumber = 7219202052;
    vm.vendor.location = "PDC1";

  
    // Save Vendor
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.vendorForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.vendor._id) {
        vm.vendor.$update(successCallback, errorCallback);
      } else {
        vm.vendor.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('vendor.view', {
          vendorId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
