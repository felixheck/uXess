/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxs').service('uxsAuthTypeHandler', [
    'uxsAUTH_TYPES',
    UxsAuthTypeHandler
  ]);

  /**
   * @function
   * @public
   *
   * @description
   * Handle various authorization types
   *
   * @param {Object.<string, string>} uxsAUTH_TYPES Available auth types (DI)
   */
  function UxsAuthTypeHandler(uxsAUTH_TYPES) {

    /**
     * @type {Object}
     * @private
     *
     * @description
     * Store private variables in a centrally manner
     */
    var data = {
      defaultAuthType: 'any'
    };

    /**
     * @function
     * @public
     *
     * @description
     * Set the default auth type
     *
     * @param {string} authType Auth type to be set
     */
    this.setDefaultAuthType = function setDefaultAuthType(authType) {
      var isVerified = this.isAuthType(authType);
      var parsedAuthType;

      if(isVerified) {
        parsedAuthType = this.parseAuthType(authType);
        data.defaultAuthType = parsedAuthType;
      }
    };

    /**
     * @function
     * @public
     *
     * @description
     * Get the default auth type
     *
     * @returns {string} `defaultAuthType`
     */
    this.getDefaultAuthType = function getDefaultAuthType() {
      return data.defaultAuthType;
    };

    /**
     * @function
     * @public
     *
     * @description
     * Check if passed auth type is valid
     *
     * @param {string} authType Auth type to be checked
     * @returns {boolean} Auth type is valid
     */
    this.isAuthType = function isAuthType(authType) {
      var parsedAuthType = this.parseAuthType(authType);
      var authTypeKeys = Object.keys(uxsAUTH_TYPES);

      return authTypeKeys.indexOf(parsedAuthType) !== -1
    };

    /**
     * @function
     * @public
     *
     * @description
     * Parse passed auth type
     *
     * @param {string} authType Auth type to be parsed
     * @returns {string} Parsed auth type
     */
    this.parseAuthType = function parseAuthType(authType) {
      var parsedAuthType = data.defaultAuthType;

      if(angular.isString(authType)) {
        parsedAuthType = angular.lowercase(authType).trim();
      }

      return parsedAuthType;
    }
  }

})();
