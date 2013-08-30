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
            commentStyle: 'c',
            tab: '\t',
            intro: 'The humans responsible & colophon'
        } ),
        formatKey = function ( str ) {
            return str.replace( /\w\S*/g, function( txt ) {

                return txt.charAt( 0 ).toUpperCase( ) + txt.substr( 1 ).toLowerCase( ).replace( '_', ' ' );

            } );
        },
        writeComment;

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
        }


        this.files.forEach( function( f ) {

            var files,
                date = ( options.date ) ? options.date : new Date( ),
                contents = '';

            // Set save location
            if ( !f.dest ) {
                f.dest = options.fileName;
            }

            // Start creation of CACHE MANIFEST
            if ( options.intro ) {
              contents += writeComment( options.intro );
            }

            contents += writeComment( 'humanstxt.org' );

            // Optional TimeStamp ( can be overriden with option value )
            if ( options.content ) {

                for ( var section in options.content ) {

                    contents += '\n';

                    contents += writeComment( section.toUpperCase() );

                    if (section.toLowerCase() === 'site') {
                      contents += options.tab + "Last update: " + date.getDate() + "/"	+ ( date.getMonth()	+ 1 ) + "/"	+ date.getFullYear() + '\n';
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
            }

            grunt.file.write( f.dest, contents );

            grunt.log.writeln( 'File "' + f.dest + '" created.' );

        } );

    } );

};
