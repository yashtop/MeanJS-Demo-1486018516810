(function () {
  'use strict';

  angular
    .module('vendor.services')
    .factory('VendorService', VendorService);

  VendorService.$inject = ['$resource'];

  function VendorService($resource) {
    return $resource('api/vendors/:vendorId', {
      vendorId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
