/*
 * grunt-humans-txt
 * https://github.com/roughcoder/grunt-humans-txt
 *
 * Copyright (c) 2013 Neil Barton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

  // Project configuration.
  grunt.initConfig( {
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: [ 'tmp' ]
    },

    // Configuration to be run (and then tested).
    humans_txt: {
      external_file: {
        options: {
          content: grunt.file.readJSON('test/fixtures/humans.json')
        },
        dest: 'tmp/humans-external_file.txt'
      },
      options: {
        content: {
          'team': [ {
              'Web developer': 'Neil Barton',
              'Site': 'http://www.roughcoder.com',
              'Twitter': '@roughcoder',
              'Location': 'London, UK'

            },
            {
              'Ruby guy': 'Sam Jones',
              'Site': 'http://www.samjones.com',
              'Twitter': '@samjones'
            }
          ],
          'thanks': [
            {
              'Name': 'David Jones',
              'Website': 'www.google.com'
            }
          ],
          'site': [ {
              'Version': '<%= pkg.version %>',
              'Site Url': '<%= pkg.homepage %>',
              'Keywords': '<%= pkg.keywords %>',
              'Language': 'English',
              'Technology': 'node.js, apache'
            }
          ]
        }
      },
      default_options: {
        options: {
        },
        dest: 'tmp/humans-default_options.txt'
      },
      original_style: {
        options: {
          commentStyle: 'u',
          includeUpdateIn: false,
          tab: ''
        },
        dest: 'tmp/humans-original_style.txt'
      }

    },

    // Unit tests.
    nodeunit: {
      tests: [ 'test/*_test.js' ]
    }

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
