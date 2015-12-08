/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxs').provider('uxsPermitHandler', [
    UxsPermitHandler
  ]);

  /**
   * @function
   * @public
   *
   * @description
   * Handle permits and share data
   */
  function UxsPermitHandler() {
    /**
     * @type{(Array.<?string> | string)}
     * @private
     *
     * @description
     * Provided permits
     */
    var providedPermits;

    /**
     * @function
     * @private
     *
     * @description
     * Set `providedPermits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be provided
     */
    this.setPermits = function setPermits(permits) {
      providedPermits = permits;
    };

    /**
     * @function
     * @public
     *
     * @description
     * Public service to handle permits and share data
     *
     * @param {Object} $rootScope Access to root scope (DI)
     * @returns {Object} Public interface
     */
    this.$get = function($rootScope) {
      /**
       * @type {Object}
       * @public
       *
       * @description
       * Public service interface
       */
      var service = {};

      /**
       * @type {Object}
       * @private
       *
       * @description
       * Store private variables in a centrally manner
       */
      var data = {
        permits: []
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Parse permits to list of trimmed and transformed ones
       *
       * @param {(Array.<?string> | string)} permits Permits to be parsed
       * @returns {Array.<?string>} List of permits
       */
      service.parsePermits = function parsePermits(permits) {
        var parsedPermits = [];

        if (permits && angular.isString(permits)) {
          permits = permits.split(',');
        }

        if (permits && angular.isArray(permits)) {
          parsedPermits = parsePermitList(permits);
        }

        return parsedPermits;
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Get `data.permits`
       *
       * @returns {Array.<?string>} `data.permits`
       */
      service.getPermits = function getPermits() {
        return data.permits;
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Set `data.permits`
       *
       * @fires `uxsPermitsChanged`
       *
       * @param {(Array.<?string> | string)} permits Permits to be set
       */
      service.setPermits = function setPermits(permits) {
        data.permits = this.parsePermits(permits);
        $rootScope.$broadcast('uxsPermitsChanged');
      };

      /**
       * @function
       * @private
       * @this service
       *
       * @description
       * Parse list of permits by trimming and transforming
       *
       * @param {Array.<?string>} permits Permits to be parsed
       * @returns {Array.<?string>} List of permits
       */
      function parsePermitList(permits) {
        return permits.map(function (permit) {
          try {
            permit = angular.lowercase(permit).trim();
          } catch(error) {
            permit = ''
          }
          return permit;
        });
      }

      /**
       * @function
       * @private
       *
       * @description
       * Parse provided permits if available
       */
      function parseProvidedPermits() {
        if(providedPermits) {
          service.setPermits(providedPermits);
        }
      }

      parseProvidedPermits();

      return service;
    }
  }

})();
