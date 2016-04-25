(function () {
  'use strict';

  angular
    .module('order.services')
    .factory('OrderService', OrderService);

  OrderService.$inject = ['$resource'];

  function OrderService($resource) {
    return $resource('api/order/:orderId', {
      orderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
