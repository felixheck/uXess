/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2015
 * @license MIT
 */

(function() {

  'use strict';

	angular.module('uxess').factory('permitHandler', permitHandler);

  /**
   * @function
   * @public
   *
   * @description
   * Handle permits and share data
   *
   * @returns {Object.<Function>} Grant access to defined private scope
   */
  function permitHandler() {

    /**
     * @type {Object}
     * @public
     */
    var permitHandler = {};

    /**
     * @type {Object}
     * @private
     */
    var data = {
      permits: []
    };

    /**
     * @function
     * @public
     * 
     * @description
     * Parse permits to list of trimmed and lowercase ones
     *
     * @param {(Array.<?string> | string)} permits Permits to be parsed
     * @returns {Array.<?string>} List of permits
     */
    permitHandler.parsePermits = function parsePermits(permits) {
      if(!angular.isArray(permits) && !angular.isString(permits)) return [];
      if(!permits) return [];

      if(!angular.isArray(permits)) {
        permits = permits.split(',');
      }

      return permits.map(function(permit) {
        return angular.lowercase(permit.trim());
      })
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
    permitHandler.getPermits = function getPermits() {
      return data.permits;
    };

    /**
     * @function
     * @public
     * @this permitHandler
     *
     * @description
     * Set `data.permits`
     *
     * @param {(Array.<?string> | string)} permits Permissions to be set
     */
    permitHandler.setPermits = function setPermits(permits) {
      data.permits = this.parsePermits(permits);
    };

    /**
     * @function
     * @public
     * @this permitHandler
     *
     * @description
     * Check whether all passed permits are included in `data.permits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
     * @returns {boolean} All passed permits are set
     */
    permitHandler.hasPermits = function hasPermits(permits) {
      var parsedPermits = this.parsePermits(permits);
      return parsedPermits.every(inspectPermits);
    };

    /**
     * @function
     * @public
     * @this permitHandler
     *
     * @description
     * Check whether any of passed permits is included in `data.permits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
     * @returns {boolean} Any of passed permits is set
     */
    permitHandler.hasAnyPermits = function hasAnyPermits(permits) {
      var parsedPermits = this.parsePermits(permits);
      return parsedPermits.some(inspectPermits);
    };

    /**
     * @function
     * @public
     * @this permitHandler
     *
     * @description
     * Check whether none of passed permits is included in `data.permits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
     * @returns {boolean} None of passed permits is set
     */
    permitHandler.hasNonePermits = function hasNonePermits(permits) {
      return !this.hasAnyPermits(permits);
    };

    /**
     * @function
     * @private
     *
     * @description
     * Check whether element is included in `data.permits`
     *
     * @param {string} element Element to be searched for
     * @returns {boolean} Element is included
     */
    function inspectPermits(element) {
      return data.permits.indexOf(element) !== -1;
    }

    return permitHandler;
  }

})();