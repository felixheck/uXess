/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.1.0
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxs').provider('uxsWildcardHandler', [
    UxsWildcardHandler
  ]);

  /**
   * @function
   * @public
   *
   * @description
   * Handle wildcard and share data
   */
  function UxsWildcardHandler() {
    /**
     * @type{string}
     * @private
     *
     * @description
     * Provided wildcard
     */
    var _providedWildcard;

    /**
     * @function
     * @public
     *
     * @description
     * Set `providedPermits`
     *
     * @param {string} wildcard Wildcard symbol
     */
    this.setWildcard = function setWildcard(wildcard) {
      _providedWildcard = wildcard;
    };

    /**
     * @function
     * @public
     *
     * @description
     * Public service to handle wildcard and share data
     *
     * @returns {Object} Public interface
     */
    this.$get = function() {
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
        wildcard: '*',
        defaultWildcard: '*'
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Parse wildcard to string
       *
       * @param {string} wildcard Wildcard to be parsed
       * @returns {string} Parsed wildcard
       */
      service.parseWildcard = function parseWildcard(wildcard) {
        var parsedWildcard;

        try {
          parsedWildcard = wildcard.toString();
        } catch(error) {
          parsedWildcard = _data.defaultWildcard;
        }

        return parsedWildcard;
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Get `_data.wildcard`
       *
       * @returns {Array.<?string>} `_data.permits`
       */
      service.getWildcard = function getWildcard() {
        return _data.wildcard;
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Set `_data.wildcard`
       **
       * @param {string} wildcard Wildcard to be set
       */
      service.setWildcard = function setWildcard(wildcard) {
        _data.wildcard = this.parseWildcard(wildcard);
      };

      /**
       * @function
       * @private
       *
       * @description
       * Parse provided wildcard if available
       */
      function _parseProvidedWildcard() {
        if(_providedWildcard) {
          service.setWildcard(_providedWildcard);
        }
      }

      _parseProvidedWildcard();

      return service;
    }
  }

})();
