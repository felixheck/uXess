;(function() {

	'use strict';

	angular.module('uXessSample', ['uxs'])
    .controller('SampleCtrl', ['uxsPermitHandler', function(uxsPermitHandler) {
      this.roles = {
        user: false,
        editor: false,
        admin: false
      };

      this.changePermits = function() {
        var vm = this;
        var currentRoles = Object.keys(this.roles).filter(function(value) {
            return vm.roles[value];
          });
        uxsPermitHandler.setPermits(currentRoles);
      };
    }]);
})();