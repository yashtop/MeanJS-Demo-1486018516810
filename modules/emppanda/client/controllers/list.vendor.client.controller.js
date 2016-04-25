(function () {
  'use strict';

  angular
    .module('emppanda')
    .controller('VendorListController', VendorListController);

  VendorListController.$inject = ['VendorService','OrderService','orderResolve'];

  function VendorListController(VendorService,OrderService,order) {
    var vm = this;
    vm.order = order;

    vm.vendors = VendorService.query();
    vm.saveOrder = saveOrder;
    
      // Save Order
    function saveOrder() {
    	
    	 var menu = [
    			{itemname:"Aloo Paratha", category:"Veg", rate:200, quantity: 2},
    			{itemname:"Fried Rice", category:"Veg", rate:150, quantity: 4}    			
    			];
    			
    	vm.order.orderto = vm.vendors[0]._id;
    	vm.order.orderby = vm.vendors[1]._id;
    	vm.order.ordereditems = menu;
    	
    	 // TODO: move create/update logic to service
      if (vm.order._id) {
        vm.order.$update(successCallback, errorCallback);
      } else {
        vm.order.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('order.view', {
         orderId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
     
    }
  }
})();
