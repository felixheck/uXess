angular.module('templates', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('demo.tpl.html',
    '<h1>Demo Partial</h1>');
  $templateCache.put('demo2.tpl.html',
    '<h1>Demo Partial</h1>');
  }]);