// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Cấu hình cho Jasmine
        random: false,
        // Tắt random execution order
        seed: '4321',
        // Seed cố định cho reproducible tests

        stopOnFailure: true
      },
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-calendar'),
      subdir: '.',
      reporters: [
        {type: 'html'},
        {type: 'text-summary'}
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    browsers: ['Chrome', 'Firefox', 'Safari'],
    // Cấu hình custom launchers
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-web-security']
      },
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    },
    restartOnFileChange: true
  });
}
