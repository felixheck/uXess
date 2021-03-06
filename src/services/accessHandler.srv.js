/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.1.2
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

	'use strict';

	angular.module('uxs').service('uxsAccessHandler', [
    'uxsAUTH_TYPES',
    'uxsAuthTypeHandler',
    'uxsPermitHandler',
    'uxsWildcardHandler',
    UxsAccessHandler
  ]);

  /**
   * @function
   * @public
   *
   * @description
   * Handle access and authorization
   *
   * @param {Object.<string, string>} uxsAUTH_TYPES Available auth types (DI)
   * @param {Object.<string, Function>} uxsAuthTypeHandler Factory to handle auth types (DI)
   * @param {Object.<string, Function>} uxsPermitHandler Factory to handle permits (DI)
   * @param {Object.<string, Function>} uxsWildcardHandler Factory to handle wildcard (DI)
   */
  function UxsAccessHandler(uxsAUTH_TYPES, uxsAuthTypeHandler, uxsPermitHandler, uxsWildcardHandler) {
    /**
     * @function
     * @public
     *
     * @description
     * Check if any permits are included in `data.permits`of `uxsPermitHandler`
     *
     * @returns {boolean} Any permit is set
     */
    this.hasPermits = function hasPermits() {
      var permits = uxsPermitHandler.getPermits();

      return permits.length > 0;
    };

    /**
     * @function
     * @public
     *
     * @description
     * Check if all passed permits are included in `data.permits` of `uxsPermitHandler`
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
     * @returns {boolean} All passed permits are set
     */
    this.hasAllPermits = function hasAllPermits(permits) {
      var parsedPermits = uxsPermitHandler.parsePermits(permits);

      return parsedPermits.every(_comparePermits);
    };

    /**
     * @function
     * @public
     *
     * @description
     * Check if any of passed permits is included in `data.permits` of `uxsPermitHandler`
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
     * @returns {boolean} Any of passed permits is set
     */
    this.hasAnyPermits = function hasAnyPermits(permits) {
      var parsedPermits = uxsPermitHandler.parsePermits(permits);

      return parsedPermits.some(_comparePermits);
    };

    /**
     * @function
     * @public
     *
     * @description
     * Check if none of passed permits is included in `data.permits` of `uxsPermitHandler`
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
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
     * @param {(Array.<?string> | string)} permits Permits to be searched for
     * @param {string} authType Required auth type
     * @returns {boolean} UI element is accessible
     */
    this.isPermitted = function isPermitted(permits, authType) {
      var isVerified = uxsAuthTypeHandler.isAuthType(authType);
      var parsedAuthType = uxsAuthTypeHandler.parseAuthType(authType);
      var permitInspector = uxsAUTH_TYPES[parsedAuthType];
      var wildcard = uxsWildcardHandler.getWildcard();
      var result;

      if(permits === wildcard) {
        result = this.hasPermits();
      } else {
        result = isVerified && this[permitInspector](permits);
      }

      return result;
    };

    /**
     * @function
     * @private
     *
     * @description
     * Check if element is included in `data.permits` of `uxsPermitHandler`
     *
     * @param {string} element Element to be searched for
     * @returns {boolean} Element is included
     */
    function _comparePermits(element) {
      return uxsPermitHandler.getPermits().indexOf(element) !== -1;
    }
  }

})();
