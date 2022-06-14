const path = require('path')
const resolve = path.resolve
const webpack = require('webpack')

const config = {
  // mode: "development",
  entry: resolve(__dirname, '../src/index'),
  output: {
    clean: true
  }
}

/*  使用node接口进行编译（此时所有的报告和错误处理都必须自行实现）
    官方文档 https://webpack.docschina.org/api/node/
*/
webpack(config, (err, stats) => {
  // 传入回调函数，会在webpack compiler 运行时被执行
})
