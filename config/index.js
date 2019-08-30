'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {},
    proxyTable: {
      '/api': {
          target: 'https://www.bitfdn.com/api',//后端接口地址
          // target: 'https://www.hxex.com/api',//后端接口地址
          changeOrigin: true,//是否允许跨越
          pathRewrite: {
              '^/api': '/',//重写,
          }
      },
      '/json_svr': {
        target: 'https://gateio.news/json_svr',//后端接口地址
        // target: 'https://www.hxex.com/api',//后端接口地址
        changeOrigin: true,//是否允许跨越
        "secure": true,//false为http访问，true为https访问
        pathRewrite: {
            '^/json_svr': '/',//重写,
        },
        "headers": {//设置请求头伪装成手机端的访问
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
        }
      },
      '/news': {
        target: 'https://www.chainfor.com/news',//后端接口地址
        // target: 'https://www.hxex.com/api',//后端接口地址
        changeOrigin: true,//是否允许跨越
        "secure": true,//false为http访问，true为https访问
        pathRewrite: {
            '^/news': '/',//重写,
        },
        "headers": {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate,br",
          "Accept-Language": "zh-CN,zh;q=0.9",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
          
          // "Cookie":"_ga=GA1.2.836631000.1565771885; _gid=GA1.2.1858403843.1565771885; _gat_gtag_UA_122948497_1=1; Hm_lvt_1b3d00072faa6b9490791cdd184333c3=1565771885,1565837003; JSESSIONID=E7077281337160704B2461823C3246A7; Hm_lpvt_1b3d00072faa6b9490791cdd184333c3=1565837006",
          // "Accept":'*/*',
          // "Host":"www.chainfor.com",
          // "Referer":"https://www.chainfor.com/lives/index.html",
          // "X-Requested-With":"XMLHttpRequest"
        }
      },
      '/project': {
        target: 'https://iapi.bishijie.com/project',//后端接口地址
        // target: 'https://www.hxex.com/api',//后端接口地址
        changeOrigin: true,//是否允许跨越
        "secure": true,//false为http访问，true为https访问
        pathRewrite: {
            '^/project': '/',//重写,
        },
        "headers": {//设置请求头伪装成手机端的访问
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
          "Accept-Language": "zh-CN,zh;q=0.9"
        }
      }

  },
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8012, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
