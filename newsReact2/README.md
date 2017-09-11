webpack+karma+jasmine（支持es6）
============================
JS考试---原生方向 的参考脚手架（脚手架同学可以用自己平时项目内的，``脚手架不参与评分``）
## 最后提交说明
1. 除了./node_modules，都需要提供。

## 安装 
1. nodejs
 >64位：https://nodejs.org/dist/v4.4.4/node-v4.4.4-x64.msi
 32位：https://nodejs.org/dist/v4.4.4/node-v4.4.4-x86.msi

1. npm install      需要安装nodejs, 地址：http://localhost:8080/webpack-dev-server/


## 目录结构的说明
1. ./src/components     放开发组件的代码
1. ./src/components/**/css      放开发组件的scss ``（可直接在scss文件里写css)``
1. ./test/components        放单元测试的代码
1. ./test/coverage      放测试覆盖率的文件``（自动生成）`` 
## 运行
1. npm start        开发，有sourcemap进行调试
1. npm test     测试，并生成测试覆盖率,文件在./test/coverage
1. webpack  打包 