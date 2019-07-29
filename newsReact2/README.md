## 直接执行webpack就可以编译打包，无需拷贝依赖的静态资源如css，images
1. 在plugin中添加 new ExtractTextPlugin('css/[name].css')
2. 在loaders中添加 {test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
3. 最后在index.js中添加 require('./src/styles/weiboList.css')
4. 访问地址  http://localhost:8088/index.html#/view/:2 (http://localhost:8088/#/view/:2)
