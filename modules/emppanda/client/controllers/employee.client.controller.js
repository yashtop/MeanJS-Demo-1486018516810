(function () {
  'use strict';

  angular
    .module('emppanda')
    .controller('EmployeeController', EmployeeController);

  EmployeeController.$inject = ['$scope', '$state', 'employeeResolve', 'Authentication'];

  function EmployeeController($scope, $state, employee, Authentication) {
    var vm = this;

    vm.employee = employee;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;

    vm.employee.phonenumber = 7219202052;
    vm.employee.location = "PDC1";
    vm.employee.emailid = "vinod.khandelwal@gmail.com";
    vm.employee.role = "Employee";
    

  
    // Save Employee
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.employeeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.employee._id) {
        vm.employee.$update(successCallback, errorCallback);
      } else {
        vm.employee.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('employee.view', {
          employeeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
