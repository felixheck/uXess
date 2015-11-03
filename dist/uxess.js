/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2015
 * @license MIT
 */

(function() {

  'use strict';

  angular.module('uxess', [
    'templates'
  ]);

})();
angular.module('templates', [])
  .run(['$templateCache', function($templateCache) {}]);
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
   * @param {Object.<string>} ACCESS_TYPES Available access types (DI)
   * @param {Object.<Function>} permitHandler Factory for handle permits (DI)
   * @returns {Object.<Function>} Grant access to defined private scope
   */
  function accessHandler(ACCESS_TYPES, permitHandler) {

    /**
     * @type {Object}
     * @public
     */
    var accessHandler = {};

    /**
     * @type {string}
     * @private
     */
    var defaultAccessType = 'any';

    /**
     * @function
     * @public
     * @this accessHandler
     *
     * @description
     * Set the default access type
     *
     * @param {string} accessType Access type to be set
     */
    accessHandler.setDefaultAccessType = function setDefaultAccessType(accessType) {
      var isVerified = this.verifyAccessType(accessType);
      var parsedAccessType = parseAccessType(accessType);

      if(isVerified) {
        defaultAccessType = parsedAccessType;
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
    accessHandler.getDefaultAccessType = function getDefaultAccessType() {
      return defaultAccessType;
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
    accessHandler.verifyAccessType = function verifyAccessType(accessType) {
      var parsedAccessType = parseAccessType(accessType);
      var accessTypeKeys = Object.keys(ACCESS_TYPES);

      return accessTypeKeys.indexOf(parsedAccessType) !== -1
    };

    /**
     * @function
     * @public
     * @this accessHandler
     *
     * @description
     * Check whether UI element is accessible for user
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
     * @param {string} accessType Required access type
     * @returns {boolean} UI element is accessible
     */
    accessHandler.isAccessible = function isAccessible(permits, accessType) {
      var isVerified = this.verifyAccessType(accessType);
      var parsedAccessType = parseAccessType(accessType);
      var permitTesterName = ACCESS_TYPES[parsedAccessType];

      return isVerified && permitHandler[permitTesterName](permits);
    };

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
      var parsedAccessType = defaultAccessType;

      if(angular.isString(accessType)) {
        parsedAccessType = angular.lowercase(accessType).trim();
      }

      return parsedAccessType;
    }

    return accessHandler;
  }

})();
/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2015
 * @license MIT
 */

(function() {

  'use strict';

	angular.module('uxess').constant('ACCESS_TYPES', {
    'any': 'hasAnyPermits',
    'all': 'hasPermits',
    'none': 'hasNonePermits'
  });

})();
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
     * Parse permits to list of trimmed and transformed ones
     *
     * @param {(Array.<?string> | string)} permits Permits to be parsed
     * @returns {Array.<?string>} List of permits
     */
    permitHandler.parsePermits = function parsePermits(permits) {
      var parsedPermits = [];

      if(permits && angular.isString(permits)) {
        permits = permits.split(',');
      }

      if(permits && permits.length) {
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

    return permitHandler;
  }

})();