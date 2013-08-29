/*
 * grunt-humans-txt
 * https://github.com/roughcoder/grunt-humans-txt
 *
 * Copyright (c) 2013 Neil Barton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

  var fs = require( 'fs' ),
    pJSON = JSON.parse( fs.readFileSync( 'package.json', 'utf8' ) )

    if ( !pJSON ) {
      grunt.log.writeln( 'Unable to find a package.json file.' );
    }

    // Project configuration.
  grunt.initConfig( {
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: [ 'exmaples' ],
    },

    // Configuration to be run (and then tested).
    humans_txt: {

      options: {
        content: {
          team: [ {
              'Front-end developer': 'Neil Barton',
              'Site': 'http://www.roughcoder.com',
              'Twitter': '@roughcoder'
          },
            {
              'Name': 'Sam Jones',
              'Site': 'http://www.samjones.com',
              'Twitter': '@samjones'
          }
          ],
          thanks: [
            {
              'Name ': 'David Jones',
              'Website': 'www.google.com'
            }
          ],
          technology: [
            'node.js, apache',
            'Something else'
          ],
          language: [
            'English'
          ],
          site: [ {
              version: pJSON.version,
              site_url: pJSON.homepage,
              keyword: pJSON.keywords
          }
          ]
        }
      },
      files: {
        dest: 'examples/humans-default_options.txt'
      }

    },

    // Unit tests.
    nodeunit: {
      tests: [ 'test/*_test.js' ],
    },

  } );

  // Actually load this plugin's task(s).
  grunt.loadTasks( 'tasks' );

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask( 'test', [ 'clean', 'humans_txt', 'nodeunit' ] );

  // By default, lint and run all tests.
  grunt.registerTask( 'default', [ 'jshint', 'test' ] );

};
