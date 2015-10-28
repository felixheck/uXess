/*!
 * @author Felix Heck <hi@whoTheHeck.de>
 * @version 0.0.1
 * @copyright Felix Heck 2015
 * @license MIT
 */

(function() {
  'use strict';

  angular.module('uxess', ['templates']);
  angular.module('uxess').factory('restService', function () {
    return {
      auth: function (l,p) {
        return (l=='loog' && p=='pas');
      }
    }
  });
})();