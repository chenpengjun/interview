const path = require('path');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css']

const isProduction = process.env.NODE_ENV === 'PROD';
const cdn = {
    css: [],
    js: [
        'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    ]
}
function resolve (dir) { 
  return path.join(__dirname, dir) 
}
module.exports = {
    configureWebpack: config => {
      if (isProduction) {
          // 用cdn方式引入
          config.externals = {
              'vue': 'Vue',
              'vuex': 'Vuex',
              'vue-router': 'VueRouter',
              'axios': 'axios'
          }
      }
      if (isProduction) {
          // 为生产环境修改配置...
          config.plugins.push(
              //生产环境自动删除console
              new UglifyJsPlugin({
                  uglifyOptions: {
                      compress: {
                          drop_debugger: true,
                          drop_console: true,
                      },
                  },
                  sourceMap: false,
                  parallel: true,
              })
          );
          config.plugins.push(new BundleAnalyzerPlugin())
          config.plugins.push(new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),//匹配文件名
            threshold: 10240,//对10K以上的数据进行压缩
            minRatio: 0.8,
            deleteOriginalAssets:false,//是否删除源文件
          }))
      }
  },
    css: {
        loaderOptions: {
          
        }
    },
    devServer: {
        port: 80,
        disableHostCheck: true
    },
    productionSourceMap: false,
    chainWebpack: (config)=>{ 
      config.resolve.alias 
          .set('assets',resolve('src/assets')) 
          .set('components',resolve('src/components')) 
          .set('utils',resolve('src/utils')) 
      config.output.filename('[name].[hash].js').end();
      if (isProduction) {
          // 生产环境注入cdn
          config.plugin('html')
              .tap(args => {
                  args[0].cdn = cdn;
                  return args;
              });
      }
   },
}