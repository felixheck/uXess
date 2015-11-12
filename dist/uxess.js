/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2015
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxess', [
    'templates']);

})();
angular.module('templates', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('demo.tpl.html',
    '<h1>Demo Partial</h1>');
  $templateCache.put('demo2.tpl.html',
    '<h1>Demo Partial</h1>');

  }]);

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
/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2015
 * @license MIT
 */

;(function() {

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
      var test;
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
     * @param {(Array.<?string> | string)} permits Permissions to be set
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
     * Check whether all passed permits are included in `data.permits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
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
     * Check whether any of passed permits is included in `data.permits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
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
     * Check whether none of passed permits is included in `data.permits`
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
     * Check whether UI element is accessible for user
     *
     * @param {(Array.<?string> | string)} permits Permits to be searched for
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
  }

})();
/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2015
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxess').directive('uxsIf', [
    '$animate',
    'PermitHandler',
    uxsIf
  ]);


  /**
   * @function
   * @public
   *
   * @description
   * Handle UI elements based on permits
   *
   * @param {Object} $animate Service to animate UI elements (DI)
   * @param {Object} PermitHandler Factory to handle permits (DI)
   * @returns {Object} Grant access to private scope
   */
  function uxsIf($animate, PermitHandler) {

    /**
     * @function
     * @public
     *
     * @description
     * Handle DOM manipulation
     *
     * @listens `uxsPermitsChanged`
     *
     * @param {Object} scope Scope to be used for registering event handler
     * @param {Object} element The element where the directive is to be used
     * @param {Array.<?string>} attr List of attributes declared on this element
     * @param {Function} ctrl Directive's required controller instance
     * @param {Function} transclude Transclude linking function
     */
    function link(scope, element, attr, ctrl, transclude) {
      var isAccessible = PermitHandler.isPermitted(attrs.uxsIf, attrs.uxsType);

      if(isAccessible) {
        $animate.enter();
      } else {
        $animate.leave();
      }

      angular.noop();
      scope.$on('uxsPermitsChanged', angular.noop);
    }

    return {
      multiElement: true,
      transclude: 'element',
      priority: 1000,
      terminal: true,
      restrict: 'A',
      link: link
    };
  }

})();