'use strict'
require('babel-register')

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.js')
var opn = require('opn');

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true
}).listen(8088, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err)
  }
  opn('http://localhost:8088/#/', {app: 'chrome'});
  console.log('Listening at localhost:8088/#/')
})