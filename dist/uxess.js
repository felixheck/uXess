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
   */
  function UxsAccessHandler(uxsAUTH_TYPES, uxsAuthTypeHandler, uxsPermitHandler) {
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
      var parsedPermits = uxsPermitHandler.parsePermits(permits);

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
      var parsedPermits = uxsPermitHandler.parsePermits(permits);

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
    var providedDefaultAuthType;

    /**
     * @function
     * @private
     *
     * @description
     * Set `providedDefaultAuthType`
     *
     * @param {string} authType Auth type to be provided
     */
    this.setDefaultAuthType = function setDefaultAuthType(authType) {
      providedDefaultAuthType = authType;
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
      var data = {
        defaultAuthType: 'any'
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Set the default auth type
       *
       * @param {string} authType Auth type to be set
       */
      service.setDefaultAuthType = function setDefaultAuthType(authType) {
        var isVerified = this.isAuthType(authType);
        var parsedAuthType;

        if (isVerified) {
          parsedAuthType = this.parseAuthType(authType);
          data.defaultAuthType = parsedAuthType;
        }
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Get the default auth type
       *
       * @returns {string} `defaultAuthType`
       */
      service.getDefaultAuthType = function getDefaultAuthType() {
        return data.defaultAuthType;
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
        var parsedAuthType = data.defaultAuthType;

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
      function parseProvidedDefaultAuthType() {
        if(providedDefaultAuthType) {
          service.setDefaultAuthType(providedDefaultAuthType);
        }
      }

      parseProvidedDefaultAuthType();

      return service;
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

  angular.module('uxs').provider('uxsPermitHandler', [
    UxsPermitHandler
  ]);

  /**
   * @function
   * @public
   *
   * @description
   * Handle permits and share data
   */
  function UxsPermitHandler() {
    /**
     * @type{(Array.<?string> | string)}
     * @private
     *
     * @description
     * Provided permits
     */
    var providedPermits;

    /**
     * @function
     * @private
     *
     * @description
     * Set `providedPermits`
     *
     * @param {(Array.<?string> | string)} permits Permits to be provided
     */
    this.setPermits = function setPermits(permits) {
      providedPermits = permits;
    };

    /**
     * @function
     * @public
     *
     * @description
     * Public service to handle permits and share data
     *
     * @param {Object} $rootScope Access to root scope (DI)
     * @returns {Object} Public interface
     */
    this.$get = function($rootScope) {
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
      var data = {
        permits: []
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Parse permits to list of trimmed and transformed ones
       *
       * @param {(Array.<?string> | string)} permits Permits to be parsed
       * @returns {Array.<?string>} List of permits
       */
      service.parsePermits = function parsePermits(permits) {
        var parsedPermits = [];

        if (permits && angular.isString(permits)) {
          permits = permits.split(',');
        }

        if (permits && angular.isArray(permits)) {
          parsedPermits = parsePermitList(permits);
        }

        return parsedPermits;
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Get `data.permits`
       *
       * @returns {Array.<?string>} `data.permits`
       */
      service.getPermits = function getPermits() {
        return data.permits;
      };

      /**
       * @function
       * @public
       * @this service
       *
       * @description
       * Set `data.permits`
       *
       * @fires `uxsPermitsChanged`
       *
       * @param {(Array.<?string> | string)} permits Permits to be set
       */
      service.setPermits = function setPermits(permits) {
        data.permits = this.parsePermits(permits);
        $rootScope.$broadcast('uxsPermitsChanged');
      };

      /**
       * @function
       * @private
       * @this service
       *
       * @description
       * Parse list of permits by trimming and transforming
       *
       * @param {Array.<?string>} permits Permits to be parsed
       * @returns {Array.<?string>} List of permits
       */
      function parsePermitList(permits) {
        return permits.map(function (permit) {
          try {
            permit = permit.toString();
            permit = angular.lowercase(permit).trim();
          } catch(error) {
            permit = '';
          }

          return permit;
        });
      }

      /**
       * @function
       * @private
       *
       * @description
       * Parse provided permits if available
       */
      function parseProvidedPermits() {
        if(providedPermits) {
          service.setPermits(providedPermits);
        }
      }

      parseProvidedPermits();

      return service;
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

  angular.module('uxs').directive('uxsIf', [
    '$animate',
    '$interpolate',
    '$parse',
    'uxsAccessHandler',
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
   * @param {Object} $interpolate Service to convert expressions (DI)
   * @param {Object} $parse Service to convert expression contents (DI)
   * @param {Object.<string, Function>} uxsAccessHandler Factory to handle authorization (DI)
   * @returns {Object} Grant access to private scope
   */
  function uxsIf($animate, $interpolate, $parse, uxsAccessHandler) {

    /**
     * @function
     * @private
     *
     * @description
     * Check if the attribute value matches the expression pattern
     *
     * @param {string} attr Attribute value to be checked for
     * @returns {boolean} Matches the exprression pattern
     */
    function isExpression(attr) {
      return attr && attr.search(/{{2}.*}{2}/) !== -1;
    }

    /**
     * @function
     * @private
     *
     * @description
     * Extract the attribute's value by parsing or taking over
     *
     * @param {Object} scope Current scope context
     * @param {string} attr Attribute's value
     * @returns {Array.<?string> | string} Extracted attribute's value
     */
    function extractAttribute(scope, attr) {
      var hasExpression = isExpression(attr);
      var parseFn = $parse;
      var extractedAttr;

      if(hasExpression) {
        parseFn = $interpolate;
      }

      try {
        extractedAttr = parseFn(attr)(scope);
      } catch(error) {
        extractedAttr = attr;
      }

      return extractedAttr || attr;
    }

    /**
     * @function
     * @private
     *
     * @description
     * Check if the user meets the required permits and the auth type
     *
     * @param {Object} scope Current scope context
     * @param {Object} attrs The HTML elements attributes
     * @returns {boolean} If the user credentials are acceptable
     */
    function checkCredentials(scope, attrs) {
      var permits = extractAttribute(scope, attrs.uxsIf);
      var authType = extractAttribute(scope, attrs.uxsType);

      return uxsAccessHandler.isPermitted(permits, authType);
    }

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
      var isAccessible;
      var childScope;
      var cloneReference;

      /**
       * @function
       * @private
       *
       * @description
       * Show or hide element based on credentials
       */
      function checkVisibility() {
        isAccessible = checkCredentials(scope, attrs);

        if (isAccessible) {
          if(!childScope) {
            transclude(function (clone, newScope) {
              childScope = newScope;
              clone.push(document.createComment(' end uxsIf '));
              cloneReference = clone;
              $animate.enter(clone, element.parent(), element);
            });
          }
        } else {
          if(childScope) {
            childScope.$destroy();
            childScope = null;
          }
          if(cloneReference) {
            $animate.leave(cloneReference);
            cloneReference = null;
          }
        }
      }

      checkVisibility();
      scope.$on('uxsPermitsChanged', checkVisibility);
    }

    function compile(element, attr) {
      attr.$set('ngCloak', 'true');
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
