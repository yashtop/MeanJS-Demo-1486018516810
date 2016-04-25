(function () {
  'use strict';

  angular
    .module('emppanda.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('emppanda', {
        abstract: true,
        url: '/emppanda',
        template: '<ui-view/>'
      })
      .state('emppanda.vendorlist', {
        url: '/listVendor',
        templateUrl: 'modules/emppanda/client/views/list-vendor.client.view.html',
        controller: 'VendorListController',
        controllerAs: 'vm',
         resolve: {
          orderResolve: newOrder
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('emppanda.createvendor', {
        url: '/addVendor',
        templateUrl: 'modules/emppanda/client/views/form-addvendor.client.view.html',
        controller: 'VendorController',
        controllerAs: 'vm',
        resolve: {
          vendorResolve: newVendor
        },
        data: {
          roles: ['user', 'admin']
        }
      })
       .state('emppanda.addemployee', {
        url: '/addEmployee',
        templateUrl: 'modules/emppanda/client/views/form-addemployee.client.view.html',
        controller: 'EmployeeController',
        controllerAs: 'vm',
        resolve: {
          employeeResolve: newEmployee
        },
        data: {
          roles: ['user', 'admin']
        }
      });
      
  }

  getVendor.$inject = ['$stateParams', 'VendorService'];

  function getVendor($stateParams, VendorService) {
    return VendorService.get({
      vendorId: $stateParams.vendorId
    }).$promise;
  }

  newVendor.$inject = ['VendorService'];

  function newVendor(VendorService) {
    return new VendorService();
  }
  
  newEmployee.$inject = ['EmployeeService'];

  function newEmployee(EmployeeService) {
    return new EmployeeService();
  }
  
   newOrder.$inject = ['OrderService'];

  function newOrder(OrderService) {
    return new OrderService();
  }
  
})();
