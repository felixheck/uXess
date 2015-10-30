/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2015
 * @license MIT
 */

(function() {

  'use strict';

	angular.module('uxess').factory('accessHandler', accessHandler);

  /**
   * @function
   * @public
   *
   * @description
   * Handle access to UI based on permits
   *
   * @param {Array.<string>} accessTypes Available access types (DI)
   * @param {Object.<Function>} permitHandler Factory for handle permits (DI)
   * @returns {Object.<Function>} Grant access to defined private scope
   */
  function accessHandler(accessTypes, permitHandler) {

    /**
     * @type {Object}
     * @public
     */
    var accessHandler = {};

    /**
     * @function
     * @private
     *
     * @description
     * Parse passed access type
     *
     * @param {string} accessType Access type to be parsed
     * @returns {string} Parsed access type
     */
    function parseAccessType(accessType) {
      var trimmedAccessType;

      if(!angular.isString(accessType)) return '';

      trimmedAccessType = accessType.trim();
      return angular.lowercase(trimmedAccessType);
    }

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
    accessHandler.verifyAccessType = function verifyAccessType(accessType) {
      var parsedAccessType = parseAccessType(accessType);
      return accessTypes.indexOf(parsedAccessType) !== -1
    };

    return accessHandler;
  }

})();