(function () {
  'use strict';

  angular
    .module('emppanda')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Employee Panda',
      state: 'emppanda',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'emppanda', {
      title: 'Add Vendor',
      state: 'emppanda.createvendor',
       roles: ['*']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'emppanda', {
      title: 'Get Vendors',
      state: 'emppanda.vendorlist',
      roles: ['*']
    });
    
     // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'emppanda', {
      title: 'Add Employee',
      state: 'emppanda.addemployee',
      roles: ['*']
    });
    
  }
})();
