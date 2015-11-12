/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2015
 * @license MIT
 */

;(function() {

  'use strict';

	angular.module('uxess').service('AccessHandler', [
    'ACCESS_TYPES',
    AccessHandler
  ]);

  /**
   * @function
   * @public
   *
   * @description
   * Handle access to UI based on permits
   *
   * @param {Object.<string>} ACCESS_TYPES Available access types (DI)
   */
  function AccessHandler(ACCESS_TYPES) {

    /**
     * @type {Object}
     * @private
     *
     * @description
     * Store private variables in a centrally manner
     */
    var data = {
      defaultAccessType:'any'
    };

    /**
     * @function
     * @public
     *
     * @description
     * Set the default access type
     *
     * @param {string} accessType Access type to be set
     */
    this.setDefaultAccessType = function setDefaultAccessType(accessType) {
      var isVerified = this.verifyAccessType(accessType);
      var parsedAccessType = this.parseAccessType(accessType);

      if(isVerified) {
        data.defaultAccessType = parsedAccessType;
      }
    };

    /**
     * @function
     * @public
     *
     * @description
     * Get the default access type
     *
     * @returns {string} `defaultAccessType`
     */
    this.getDefaultAccessType = function getDefaultAccessType() {
      return data.defaultAccessType;
    };

    /**
     * @function
     * @public
     *
     * @description
     * Check whether passed access type is valid
     *
     * @param {string} accessType Access type to be checked
     * @returns {boolean} Access type is valid
     */
    this.verifyAccessType = function verifyAccessType(accessType) {
      var parsedAccessType = this.parseAccessType(accessType);
      var accessTypeKeys = Object.keys(ACCESS_TYPES);

      return accessTypeKeys.indexOf(parsedAccessType) !== -1
    };

    /**
     * @function
     * @public
     *
     * @description
     * Parse passed access type
     *
     * @param {string} accessType Access type to be parsed
     * @returns {string} Parsed access type
     */
    this.parseAccessType = function parseAccessType(accessType) {
      var parsedAccessType = data.defaultAccessType;

      if(angular.isString(accessType)) {
        parsedAccessType = angular.lowercase(accessType).trim();
      }

      return parsedAccessType;
    }
  }

})();