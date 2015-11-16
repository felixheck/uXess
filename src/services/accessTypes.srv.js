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