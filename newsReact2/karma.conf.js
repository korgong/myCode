
module.exports = function (config) {
  const tests = './test/components/*.spec.js';
  config.set({
    frameworks: ['jasmine'],
    files: [tests],
    preprocessors: {
      [tests]: ['webpack', 'sourcemap','coverage'],
    },
    reporters: ['progress','coverage'],
    coverageReporter:{
               type:'html',
               dir:'./test/coverage/'
       },
    webpack: webpackConfig(),
    webpackMiddleware: {
      noInfo: true
    },
    colors: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  });


};

function webpackConfig() {
  const config = require('./webpack.config.js');
  delete config.context;
  delete config.entry;
  delete config.output;
  delete config.devServer;

  return config;
}

