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
     * Extract the attribute's value by parsing or taking over
     *
     * @param {Object} scope Current scope context
     * @param {string} attr Attribute's value
     * @returns {Array.<?string> | string} Extracted attribute's value
     */
    function getAttributeValue(scope, attr) {
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
     * Build trailing comment node
     *
     * @param {Array.<?string>} attrs List of attributes declared on this element
     * @returns {Object} Comment node
     */
    function getCommentNode(attrs) {
      return document.createComment(' end uxsIf: ' + attrs.uxsIf + ' ');
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
    function isAuthorized(scope, attrs) {
      var permits = getAttributeValue(scope, attrs.uxsIf);
      var authType = getAttributeValue(scope, attrs.uxsType);

      return uxsAccessHandler.isPermitted(permits, authType);
    }

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
        isAccessible = isAuthorized(scope, attrs);

        if (isAccessible) {
          if(!childScope) {
            transclude(function (clone, newScope) {
              childScope = newScope;
              clone.push(getCommentNode(attrs));
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
