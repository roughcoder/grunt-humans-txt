# grunt-humans-txt

> Generate a [humans.txt](http://humanstxt.org/) file for the website.

[![Build Status](https://travis-ci.org//roughcoder/grunt-humans-txt.png)](https://travis-ci.org/roughcoder/grunt-humans-txt)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-humans-txt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-humans-txt');
```

## The "humans_txt" task

### Overview
_Run this task with the `grunt humans_txt` command._

The task creates a humans.txt file using data from any JSON file, i.e package.json file or directly from your Gruntfile. A humans.txt is a TXT file that contains information about the different people who have contributed to building the website.

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### intro
Type: `String`
Default value: `'The humans responsible & colophon'`

A string value that is used in the head of the file.


#### commentStyle
Choices: `'c'`, `'u'`, `'p'`
Default value: `'c'`

Style of comments with section titles. Use `'c'` for C style, `'u'` for unix
style, and `'p'` for PHP style.

```
/* C STYLE COMMENT */

# UNIX STYLE COMMENT

// PHP STYLE COMMENT
```

#### tab
Type: `String`
Default value: `'\t'`

A string value that is used to advance nested values.


#### includeUpdateIn
Type: `String` or `false`
Default value: `'site'`

Include current date as *Last update* in section with specified name. Set to `false` to disable.

### Usage Examples

#### Local Content
In this example, the `content` options includes the data to be used. Each root item
is a section.

```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  humans_txt: {
    options: {
      commentStyle: 'u',
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
      },
    },
    dest: 'humans.txt', 
  },
})
```

#### External Content
In this example, the content is read from external file.

```js
grunt.initConfig({
  humans_txt: {
    options: {
      content: grunt.file.readJSON('humans.json')
    },
    dest: 'humans.txt', 
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013-09-09   v0.2.1   Test tweak to allow Travis
* 2013-08-20   v0.2.0   Extended variability, tests
* 2013-06-11   v0.1.0   Initial task.
