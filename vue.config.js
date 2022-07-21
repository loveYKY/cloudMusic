const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir) //设置绝对路径
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './', // 从 Vue CLI3.3 起已弃用，请使用publicPath
  outputDir: 'dist',
  lintOnSave: true, // 是否在保存的时候检查
  devServer: {
    // 环境配置
    host: 'localhost',
    port: 8081,
    open: true //配置自动启动浏览器
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
