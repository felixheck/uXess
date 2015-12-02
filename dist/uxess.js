/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxs', []);

})();

/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

	'use strict';

	angular.module('uxs').service('uxsAccessHandler', [
    'uxsAUTH_TYPES',
    'uxsAuthTypeHandler',
    'uxsPermitHandler',
    AccessHandler
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
   * @param {Object.<string, Function>} uxsPermitHandler Factory to handle access (DI)
   */
  function AccessHandler(uxsAUTH_TYPES, uxsAuthTypeHandler, uxsPermitHandler) {
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
    this.hasPermits = function hasPermits(permits) {
      var parsedPermits = this.parsePermits(permits);

      return parsedPermits.every(inspectPermits);
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
      var parsedPermits = this.parsePermits(permits);

      return parsedPermits.some(inspectPermits);
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

      return isVerified && this[permitInspector](permits);
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
    function inspectPermits(element) {
      return uxsPermitHandler.getPermits().indexOf(element) !== -1;
    }
  }

})();
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
    AuthTypeHandler
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
  function AuthTypeHandler(uxsAUTH_TYPES) {

    /**
     * @type {Object}
     * @private
     *
     * @description
     * Store private variables in a centrally manner
     */
    var data = {
      defaultAuthType:'any'
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

/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxs').constant('uxsAUTH_TYPES', {
    'any': 'hasAnyPermits',
    'all': 'hasPermits',
    'none': 'hasNonePermits'
  });

})();
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
   */
  function PermitHandler($rootScope) {

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

/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2016
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
   * @param {Object.<string, Function>} PermitHandler Factory to handle permits (DI)
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
     * @param {Array.<?string>} attrs List of attributes declared on this element
     * @param {Function} ctrl Directive's required controller instance
     * @param {Function} transclude Transclude linking function
     */
    function link(scope, element, attrs, ctrl, transclude) {
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
      priority: 800,
      terminal: true,
      restrict: 'A',
      link: link
    };
  }

})();
