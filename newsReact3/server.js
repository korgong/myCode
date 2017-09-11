'use strict'
require('babel-register')

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.js')

new WebpackDevServer(webpack(config), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true
}).listen(8088, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at localhost:8088/#/')
})