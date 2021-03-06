(function() {

  'use strict';

  exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
      '../test/e2e/*.spec.js'
    ],
    multiCapabilities: [
      {
        browserName: 'chrome',
        name: 'E2E Testing - Chrome',
        logName: 'Chrome'
      },
      {
        browserName: 'firefox',
        name: 'E2E Testing - Firefox',
        logName: 'Firefox'
      }
    ],
    onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter');
      jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: 'none',
        displayFailuresSummary: false
      }));
    },
    params: {},
    resultJsonOutputFile: 'test/e2e/result.json',
    framework: 'jasmine2',
    jasmineNodeOpts: {
      showColors: true,
      print: function() {}
    }
  };

})();
