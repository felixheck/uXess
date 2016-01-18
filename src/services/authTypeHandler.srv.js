/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.1.0
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxs').provider('uxsAuthTypeHandler', [
    UxsAuthTypeHandler
  ]);

  /**
   * @function
   * @public
   *
   * @description
   * Handle various authorization types
   */
  function UxsAuthTypeHandler() {
    /**
     * @type{string}
     * @private
     *
     * @description
     * Provided default auth type
     */
    var _providedDefaultAuthType;

    /**
     * @function
     * @public
     *
     * @description
     * Set `providedDefaultAuthType`
     *
     * @param {string} authType Auth type to be provided
     */
    this.setDefaultAuthType = function setDefaultAuthType(authType) {
      _providedDefaultAuthType = authType;
    };

    /**
     * @function
     * @public
     *
     * @description
     * Public service to handle various authorization types
     *
     * @param {Object.<string, string>} uxsAUTH_TYPES Available auth types (DI)
     * @returns {Object} Public interface
     */
    this.$get = function (uxsAUTH_TYPES) {
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
        defaultAuthType: 'any'
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Set `_data.defaultAuthType`
       *
       * @param {string} authType Auth type to be set
       */
      service.setDefaultAuthType = function setDefaultAuthType(authType) {
        var isVerified = this.isAuthType(authType);
        var parsedAuthType;

        if (isVerified) {
          parsedAuthType = this.parseAuthType(authType);
          _data.defaultAuthType = parsedAuthType;
        }
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Set `_data.defaultAuthType`
       *
       * @returns {string} `_data.defaultAuthType`
       */
      service.getDefaultAuthType = function getDefaultAuthType() {
        return _data.defaultAuthType;
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Check if passed auth type is valid
       *
       * @param {string} authType Auth type to be checked
       * @returns {boolean} Auth type is valid
       */
      service.isAuthType = function isAuthType(authType) {
        var parsedAuthType = this.parseAuthType(authType);
        var authTypeKeys = Object.keys(uxsAUTH_TYPES);

        return authTypeKeys.indexOf(parsedAuthType) !== -1
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Parse passed auth type
       *
       * @param {string} authType Auth type to be parsed
       * @returns {string} Parsed auth type
       */
      service.parseAuthType = function parseAuthType(authType) {
        var parsedAuthType = _data.defaultAuthType;

        if (angular.isString(authType)) {
          parsedAuthType = angular.lowercase(authType).trim();
        }

        return parsedAuthType;
      };

      /**
       * @function
       * @private
       *
       * @description
       * Parse provided permits if available
       */
      function _parseProvidedDefaultAuthType() {
        if(_providedDefaultAuthType) {
          service.setDefaultAuthType(_providedDefaultAuthType);
        }
      }

      _parseProvidedDefaultAuthType();

      return service;
    }
  }
})();
