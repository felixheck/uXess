(function() {

  'use strict';

  module.exports = function(config) {
    config.set({
      basePath: '../',
      frameworks: ['jasmine'],
      files: [
        'lib/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'src/**/*.js',
        'test/unit/**/*.spec.js'
      ],
      exclude: [],
      preprocessors: {
        'src/**/*.js': ['coverage']
      },
      coverageReporter: {
        type : 'html',
        dir : 'test/',
        subdir: 'coverage'
      },
      reporters: [
        'mocha',
        'coverage'
      ],
      plugins: [
        'karma-jasmine',
        'karma-mocha-reporter',
        'karma-coverage',
        'karma-phantomjs-launcher'
      ],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      browsers: ['PhantomJS'],
      autoWatch: true,
      singleRun: false
    });
  };

})();