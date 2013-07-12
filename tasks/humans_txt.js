/*
 * grunt-humans-txt
 * https://github.com/roughcoder/grunt-humans-txt
 *
 * Copyright (c) 2013 Neil Barton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

    grunt.registerMultiTask( 'humans_txt', 'Creating required HTML5 manifest files', function( ) {
        // Merge task-specific and/or target-specific options with these defaults.
        //

        function formatKey( str ) {
            return str.replace( /\w\S*/g, function( txt ) {

                return txt.charAt( 0 ).toUpperCase( ) + txt.substr( 1 ).toLowerCase( ).replace( '_', ' ' );

            } );
        }

        var options = this.options( {
            stats: false,
            intro: 'The humans responsible & technology colophon'
        } );

        this.files.forEach( function( f ) {

            var files,
                date = ( options.date ) ? options.date : new Date( ),
                contents;

            // Set save location
            if ( !f.dest ) {
                f.dest = options.fileName;
            }

            // Start creation of CACHE MANIFEST
            contents = '# humanstxt.org/\n';

            contents += '\n#' + options.intro + '+\n';

            // Optional TimeStamp ( can be overriden with option value )
            if ( options.content ) {

                for ( var section in options.content ) {

                    contents += '\n# ' + section.toUpperCase( ) + '\n\n';

                    var sectionDetails = options.content[ section ];

                    if ( typeof sectionDetails === 'string' ) {
                        sectionDetails = [ ].concat( sectionDetails );
                    }

                    for ( var i = 0; i < sectionDetails.length; i++ ) {

                        if ( typeof sectionDetails[ i ] === 'string' ) {
                            contents += sectionDetails[ i ] + '\n';
                        } else {

                            for ( var keyTech in sectionDetails[ i ] ) {

                                grunt.log.writeln( keyTech );

                                var objTech = sectionDetails[ i ][ keyTech ];

                                contents += formatKey(keyTech) + ": " + objTech + '\n';

                            }

                            contents += '\n';
                        }

                    }

                }
            }

            grunt.file.write( f.dest, contents );

            grunt.log.writeln( 'File "' + f.dest + '" created.' );

        } );

    } );

};