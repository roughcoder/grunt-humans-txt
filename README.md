# grunt-humans-txt

> Grunt task to build a humans.txt file using data from any JSON file, i.e package.json file or directly from your Gruntfile. A humans.txt is a TXT file that contains information about the different people who have contributed to building the website.

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
In your project's Gruntfile, add a section named `humans_txt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  humans_txt: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

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

\# UNIX STYLE COMMENT

// PHP STYLE COMMENT
```


#### tab
Type: `String`
Default value: `'\t'`

A string value that is used to advance nested values.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  humans_txt: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  humans_txt: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
