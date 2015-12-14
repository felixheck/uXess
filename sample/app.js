;(function() {

	'use strict';

	angular.module('uXessSample', ['uxs'])
    .config(function(uxsPermitHandlerProvider, uxsAuthTypeHandlerProvider) {
      uxsPermitHandlerProvider.setPermits('admin');
      uxsAuthTypeHandlerProvider.setDefaultAuthType('all');
    })
    .controller('SampleCtrl', ['uxsPermitHandler', function(uxsPermitHandler) {
      this.roles = {
        user: false,
        editor: false,
        admin: true
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