(function() {

  'use strict';

  /**
   * Module dependencies
   *
   * @private
   */
  var buildify = require('buildify');
  var fs = require('fs');

  /**
   * Path to root directory of the project
   *
   * @private
   * @type {string}
   */
  var root = __dirname + '/../';

  /**
   * Object containing all tasks
   *
   * @private
   * @type {Object.<Function>}
   */
  var tasks = {
    /**
     * Concat files to one distributional file
     *
     * @private
     * @type {Function}
     */
    distConcat: function distConcat() {
      buildify()
        .concat(getDistFiles([
          'src',
          'src/services',
          'src/directives'
        ]))
        .save('dist/uxess.js');
    },

    /**
     * Minify distributional file
     *
     * @private
     * @type {Function}
     */
    distMinify: function distMinify() {
      buildify()
        .load('dist/uxess.js')
        .uglify({mangle: false})
        .save('dist/uxess.min.js');
    }
  };

  /**
   * Get all direct files in a list of directories
   *
   * @private
   *
   * @param {Array.<string>} directories List of directories
   * @returns {Array.<string>} List of all files in these directories
   */
  function getDistFiles(directories) {
    var files = [];

    directories.forEach(function(directory) {
      Array.prototype.push.apply(files, getFiles(directory));
    });

    return files;
  }

  /**
   * Get all direct files in a directory
   *
   * @private
   *
   * @param {string} directory Directory to be searched for
   * @returns {Array.<string>} List of all files in this directory
   */
  function getFiles(directory) {
    var files = [];
    var filePath;
    var fileStats;

    fs.readdirSync(root + directory).forEach(function(file) {
      filePath = directory + '/' + file;
      fileStats = fs.statSync(root + filePath);

      if(fileStats.isFile()) {
        files.push(filePath);
      }
    });

    return files;
  }

  /**
   * Buildify tasks and dependencies
   */
  buildify.task({
    name: 'dist:concat',
    task: tasks.distConcat()
  });

  buildify.task({
    name: 'dist:minify',
    depends: ['dist:concat'],
    task: tasks.distMinify()
  });

  buildify.task({
    name: 'dist:build',
    depends: ['dist:minify']
  });

})();
