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
    'AccessHandler',
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
   * @param {Object} AccessHandler Factory to handle access (DI)
   * @returns {Object} Grant access to private scope
   */
  function uxsIf($animate, AccessHandler) {

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
      var isAccessible = AccessHandler.isAccessible(attrs.uxsIf, attrs.uxsType);

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
      priority: 500,
      terminal: true,
      restrict: 'A',
      link: link
    };
  }

})();