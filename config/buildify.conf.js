(function() {

  'use strict';

  /**
   * @private
   *
   * @description
   * Module dependencies
   */
  var buildify = require('buildify');
  var fs = require('fs');

  /**
   * @type {string}
   * @private
   *
   * @description
   * Path to root directory of the project
   */
  var root = __dirname + '/../';

  /**
   * @type {Object.<Function>}
   * @private
   *
   * @description
   * Object containing all tasks
   */
  var tasks = {
    /**
     * @function
     * @private
     *
     * @description
     * Concat files to one distributional file
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
     * @function
     * @private
     *
     * @description
     * Minify distributional file
     */
    distMinify: function distMinify() {
      buildify()
        .load('dist/uxess.js')
        .uglify({mangle: false})
        .save('dist/uxess.min.js');
    }
  };

  /**
   * @function
   * @private
   *
   * @description
   * Get all direct files in a list of directories
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
   * @function
   * @private
   *
   * @description
   * Get all direct files in a directory
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
   * @public
   *
   * @description
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
