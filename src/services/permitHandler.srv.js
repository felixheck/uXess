/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.1.0
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
    var _providedPermits;

    /**
     * @function
     * @public
     *
     * @description
     * Set `providedPermits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be provided
     */
    this.setPermits = function setPermits(permits) {
      _providedPermits = permits;
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
      var _data = {
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
        var parsedPermits;
        var splitPermits;

        if (permits && angular.isString(permits)) {
          splitPermits = permits.split(',');
        } else {
          splitPermits = permits;
        }

        if (splitPermits && angular.isArray(splitPermits) ) {
          parsedPermits = _parsePermitList(splitPermits);
        } else {
          parsedPermits = [];
        }

        return parsedPermits;
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Get `_data.permits`
       *
       * @returns {Array.<?string>} `_data.permits`
       */
      service.getPermits = function getPermits() {
        return _data.permits;
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Set `_data.permits`
       *
       * @fires `uxsPermitsChanged`
       *
       * @param {(Array.<?string> | string)} permits Permits to be set
       */
      service.setPermits = function setPermits(permits) {
        _data.permits = this.parsePermits(permits);
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
      function _parsePermitList(permits) {
        return permits.map(function (permit) {
          var trimmedPermits;
          var parsedPermits;

          try {
            trimmedPermits = permit.toString().trim();
            parsedPermits = angular.lowercase(trimmedPermits);
          } catch(error) {
            parsedPermits = '';
          }

          return parsedPermits;
        });
      }

      /**
       * @function
       * @private
       *
       * @description
       * Parse provided permits if available
       */
      function _parseProvidedPermits() {
        if(_providedPermits) {
          service.setPermits(_providedPermits);
        }
      }

      _parseProvidedPermits();

      return service;
    }
  }

})();
