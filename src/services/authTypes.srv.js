/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.1.2
 * @copyright Felix Heck 2016
 * @license MIT
 */

;(function() {

  'use strict';

  angular.module('uxs').constant('uxsAUTH_TYPES', {
    'any': 'hasAnyPermits',
    'all': 'hasAllPermits',
    'none': 'hasNonePermits'
  });

})();
