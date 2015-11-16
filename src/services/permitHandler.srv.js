/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

  'use strict';

	angular.module('uxess').service('PermitHandler', [
    '$rootScope',
    'ACCESS_TYPES',
    'AccessHandler',
    PermitHandler
  ]);

  /**
   * @function
   * @public
   *
   * @description
   * Handle permits and share data
   *
   * @param {Object} $rootScope Access to root scope (DI)
   * @param {Object.<string>} ACCESS_TYPES Available access types (DI)
   * @param {Object} AccessHandler Factory to handle access types (DI)
   */
  function PermitHandler($rootScope, ACCESS_TYPES, AccessHandler) {

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
     *
     * @description
     * Parse permits to list of trimmed and transformed ones
     *
     * @param {(Array.<?string> | string)} permits Permits to be parsed
     * @returns {Array.<?string>} List of permits
     */
    this.parsePermits = function parsePermits(permits) {
      var parsedPermits = [];

      if(permits && angular.isString(permits)) {
        permits = permits.split(',');
      }

      if(permits && angular.isArray(permits)) {
        parsedPermits = parsePermitList(permits);
      }

      return parsedPermits;
    };

    /**
     * @function
     * @public
     *
     * @description
     * Get `data.permits`
     *
     * @returns {Array.<?string>} `data.permits`
     */
    this.getPermits = function getPermits() {
      return data.permits;
    };

    /**
     * @function
     * @public
     *
     * @description
     * Set `data.permits`
     *
     * @fires `uxsPermitsChanged`
     *
     * @param {(Array.<?string> | string)} permits Permits to be set
     */
    this.setPermits = function setPermits(permits) {
      data.permits = this.parsePermits(permits);
      $rootScope.$broadcast('uxsPermitsChanged');
    };

    /**
     * @function
     * @public
     *
     * @description
     * Check if all passed permits are included in `data.permits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be
     *    searched for
     * @returns {boolean} All passed permits are set
     */
    this.hasPermits = function hasPermits(permits) {
      var parsedPermits = this.parsePermits(permits);

      return parsedPermits.every(inspectPermits);
    };

    /**
     * @function
     * @public
     *
     * @description
     * Check if any of passed permits is included in `data.permits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be
     *    searched for
     * @returns {boolean} Any of passed permits is set
     */
    this.hasAnyPermits = function hasAnyPermits(permits) {
      var parsedPermits = this.parsePermits(permits);

      return parsedPermits.some(inspectPermits);
    };

    /**
     * @function
     * @public
     *
     * @description
     * Check if none of passed permits is included in `data.permits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be
     *    searched for
     * @returns {boolean} None of passed permits is set
     */
    this.hasNonePermits = function hasNonePermits(permits) {
      return !this.hasAnyPermits(permits);
    };

    /**
     * @function
     * @public
     *
     * @description
     * Check if UI element is accessible for user
     *
     * @param {(Array.<?string> | string)} permits Permits to be
     *    searched for
     * @param {string} accessType Required access type
     * @returns {boolean} UI element is accessible
     */
    this.isPermitted = function isPermitted(permits, accessType) {
      var isVerified = AccessHandler.verifyAccessType(accessType);
      var parsedAccessType = AccessHandler.parseAccessType(accessType);
      var permitInspector = ACCESS_TYPES[parsedAccessType];

      return isVerified && this[permitInspector](permits);
    };

    /**
     * @function
     * @private
     *
     * @description
     * Check if element is included in `data.permits`
     *
     * @param {string} element Element to be searched for
     * @returns {boolean} Element is included
     */
    function inspectPermits(element) {
      return data.permits.indexOf(element) !== -1;
    }

    /**
     * @function
     * @private
     *
     * @description
     * Parse list of permits by trimming and transforming
     *
     * @param {Array.<?string>} permits Permits to be parsed
     * @returns {Array.<?string>} List of permits
     */
    function parsePermitList(permits) {
      return permits.map(function(permit) {
        return angular.lowercase(permit).trim();
      });
    }
  }

})();