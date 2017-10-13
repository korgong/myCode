// extract-text-webpack-plugin插件，
// 有了它就可以将你的样式提取到单独的css文件里，
// 妈妈再也不用担心样式会被打包到js文件里了。
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var nodeModulesPath = './mode_modules';
var production = process.env.NODE_ENV === 'production';

var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'main',
    // Move dependencies to our main file
    children: true,
    // Look for common dependencies in all children,
    minChunks: 2,
    // How many times a dependency must come up before being extracted
  })
];

if (production) {
  plugins = plugins.concat([
    // Production plugins go here
  ]);
}

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': './index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'), // 单独使用link标签加载css并设置路径，相对于output配置中的publicPath
    new HtmlWebpackPlugin({
      filename: './index.html', // 生成的html存放路径，相对于path
      template:'./indexTemplate.html',
      inject: 'body', // js插入的位置，true/'head'/'body'/false
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/components/**/*.js")],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(css|scss)$/,
        loader: 'stylelint-loader',
        include: [path.resolve(__dirname, "src/components/**/*.scss")],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(css|less)$/,
        loader: 'stylelint-loader',
        include: [path.resolve(__dirname, "src/components/**/*.less")],
        exclude: [nodeModulesPath]
      }
    ],
    // css-loader用于解析，使用类似@import和url（...）的方法实现require的功能
    // 而style-loader则将解析后的样式嵌入js代码，放在html文件中的样式代码不需要loader解析
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react','stage-0']//转换es6到es5并转换jsx到js的配置
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|cur)$/,
        loaders: ['url-loader?limit=8192&name=images/[hash:8].[name].[ext]']
      },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules',
          exclude: [
              path.resolve(__dirname, 'node_modules')
          ],
          include: [
              path.resolve(__dirname, 'src/components/dialog')
          ]
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
          exclude: [
              path.resolve(__dirname, 'src/components/dialog')
          ]
      },
      {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.(eot|ttf|woff|woff2|svg)$/, loader: 'file?name=fonts/[name].[ext]'}
    ]
  }
};
if (process.env.NODE_ENV !== 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}

