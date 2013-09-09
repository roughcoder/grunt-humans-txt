/*
 * grunt-humans-txt
 * https://github.com/roughcoder/grunt-humans-txt
 *
 * Copyright (c) 2013 Neil Barton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

    grunt.registerMultiTask( 'humans_txt', 'Generate information about people behind the website', function( ) {

        var options = this.options( {
                includeUpdateIn: false,
                commentStyle: 'c',
                tab: '\t',
                intro: 'The humans responsible & colophon'
            } ),
            dest;

        if ( this.files.length > 1 ) {
            grunt.verbose.warn('Destination not written because too many destinations were provided.');
        }
        if ( this.files.length < 1 || !this.files[0].dest) {
            grunt.verbose.warn('Destination not written because no destination was provided.');
        } else {
            dest = this.files[0].dest;
        }

        if ( !options.content ) {
            grunt.verbose.warn('Destination not written because no content was provided.');
        }

        var formatKey = function ( str ) {
            return str.replace( /\w\S*/g, function( txt ) {

                return txt.charAt( 0 ).toUpperCase( ) + txt.substr( 1 ).toLowerCase( ).replace( '_', ' ' );

            } );
        },
        writeLastUpdate = function ( ) {
            var date = new Date( ),
                day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear();
            return "Last update: " + year + "/"	+ month + "/" + day + '\n';
        },
        writeComment,
        contents = '';

        switch ( options.commentStyle ) {
            case 'c':
                writeComment = function ( str ) {
                    return '/* ' + str + ' */\n';
                };
                break;
            case 'u':
                writeComment = function ( str ) {
                    return '# ' + str + '\n';
                };
                break;
            case 'p':
                writeComment = function ( str ) {
                    return '// ' + str + '\n';
                };
                break;
            default:
                grunt.log.error('Unknown comment style value.');
        }

        // Start creation of CACHE MANIFEST
        if ( options.intro ) {
          contents += writeComment( options.intro );
        }

        contents += writeComment( 'humanstxt.org' );


        for ( var section in options.content ) {
            contents += '\n';

            contents += writeComment( section.toUpperCase() );

            // Optional update ( can be overriden with option value )
            if ( options.includeUpdateIn &&
                  typeof options.includeUpdateIn === 'string' &&
                  section.toLowerCase() === options.includeUpdateIn.toLowerCase() ) {
                contents += options.tab + writeLastUpdate();
            }

            var sectionDetails = options.content[ section ];

            if ( typeof sectionDetails === 'string' ) {
                sectionDetails = [ ].concat( sectionDetails );
            }

            for ( var i = 0; i < sectionDetails.length; i++ ) {

                if ( typeof sectionDetails[ i ] === 'string' ) {
                    contents += options.tab + sectionDetails[ i ] + '\n';
                } else {

                    for ( var keyTech in sectionDetails[ i ] ) {
                        var objTech = sectionDetails[ i ][ keyTech ];
                        contents += options.tab + formatKey(keyTech) + ": " + objTech + '\n';
                    }

                    if (i !== sectionDetails.length - 1) {
                      contents += '\n';
                    }
                }
            }
        }

        grunt.file.write( dest, contents );

        grunt.log.writeln( 'File "' + dest + '" created.' );


    } );

};
