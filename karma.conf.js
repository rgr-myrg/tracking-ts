// Karma configuration
// Generated on Sat Feb 17 2018 16:56:50 GMT-0500 (EST)

process.env.CHROME_BIN = require('puppeteer').executablePath();
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    mime: {
        'text/x-typescript': ['ts']
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'karma-typescript'],


    // list of files / patterns to load in the browser
    files: [
      //'node_modules/**/*.ts',
      'src/main/ts/tracking/**/*.ts',
	  'src/main/test/tracking/**/*.ts'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		//'src/main/test/tracking/**/*.ts': ['karma-typescript']
        "**/*.+(ts|tsx)": ["karma-typescript"]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'karma-typescript'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
	colors: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
