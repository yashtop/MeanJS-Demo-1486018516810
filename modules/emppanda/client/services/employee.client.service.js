(function () {
  'use strict';

  angular
    .module('employee.services')
    .factory('EmployeeService', EmployeeService);

  EmployeeService.$inject = ['$resource'];

  function EmployeeService($resource) {
    return $resource('api/employee/:employeeId', {
      employeeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
