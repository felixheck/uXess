/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxs').service('uxsPermitHandler', [
    '$rootScope',
    UxsPermitHandler
  ]);

  /**
   * @function
   * @public
   *
   * @description
   * Handle permits and share data
   *
   * @param {Object} $rootScope Access to root scope (DI)
   */
  function UxsPermitHandler($rootScope) {

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
        return angular.lowercase(permit).trim() || '';
      });
    }
  }

})();
