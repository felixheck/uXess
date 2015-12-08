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
    '$parse',
    '$interpolate',
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
   * @param {Object} $parse Service to convert expression contents (DI)
   * @param {Object} $interpolate Service to convert expressions (DI)
   * @param {Object.<string, Function>} uxsAccessHandler Factory to handle authorization (DI)
   * @returns {Object} Grant access to private scope
   */
  function uxsIf($animate, $parse, $interpolate, uxsAccessHandler) {

    function isExpression(attr) {
      return attr && attr.indexOf('{{') !== -1 && attr.indexOf('}}') !== -1;
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
      var parsingFn = $parse;
      var extractedAttr;

      if(hasExpression) {
        parsingFn = $interpolate;
      }

      try {
        extractedAttr = parsingFn(attr)(scope);
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
          transclude(function(clone, newScope) {
            clone.push(document.createComment(' end uxsIf '));
            cloneReference = clone;
            newScope.$destroy();
            $animate.enter(clone, element.parent(), element);
          });
        } else if (!isAccessible && cloneReference) {
          $animate.leave(cloneReference);
          cloneReference = null;
        }
      }

      checkVisibility();
      scope.$on('uxsPermitsChanged', checkVisibility);
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
