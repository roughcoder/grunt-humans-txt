'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.humans_txt = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/humans-default_options.txt');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  external_file: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/humans-external_file.txt');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the behavior with external file is.');

    test.done();
  },
  original_style: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/humans-original_style.txt');
    var expected = grunt.file.read('test/expected/original_style');
    test.equal(actual, expected, 'should describe what the original style behavior is.');

    test.done();
  }
};
