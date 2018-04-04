'use strict'
const path = require('path')
const vuxLoader = require('vux-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { src } = require('./dist')

// 添加私有库的列表，添加到babel的预编译列表中，否则私有库的es6不会转换成es5,导致报错
const resolve = dir => path.join(__dirname, '..', dir)

const privateLibraries = [
  resolve('node_modules/antools')
]

const isProduction = process.env.NODE_ENV === 'production'

const sourceMap = !isProduction

// css 样式抽取
// on 为true时发生抽取， on为false时原样返回
const extract = function (use, on) {
  if (on) {
    const fallback = use.shift()
    return ExtractTextPlugin.extract({fallback, use})
  } else {
    return use
  }
}

const baseWebpackConfig = {
  entry: {
    app: ['babel-polyfill', src + '/main.js']
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: { vue$: 'vue/dist/vue.esm.js', src }
  },
  module: {
    rules: [
      {
        // 对代码打包前进行eslint检测
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        include: src,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        include: [src, ...privateLibraries, resolve('node_modules/webpack-dev-server/client')],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssModules: isProduction ? {} : {
            localIdentName: '[name]-[local]',
            camelCase: true
          },
          cssSourceMap: sourceMap,
          cacheBusting: true,
          loaders: {
            scss: extract([
              'vue-style-loader',
              { loader: 'css-loader', options: { sourceMap, importLoaders: 2 } },
              { loader: 'postcss-loader', options: { sourceMap } },
              { loader: 'sass-loader', options: { sourceMap } }
            ], isProduction),
            css: extract([
              'vue-style-loader',
              { loader: 'css-loader', options: { sourceMap, importLoaders: 1 } },
              { loader: 'postcss-loader', options: { sourceMap } }
            ], isProduction)
          }
        }
      },
      {
        test: /\.scss/,
        use: extract([
          'style-loader',
          { loader: 'css-loader', options: { sourceMap, importLoaders: 2 } },
          { loader: 'postcss-loader', options: { sourceMap } },
          { loader: 'sass-loader', options: { sourceMap } }
        ], isProduction)
      },
      {
        test: /\.css$/,
        exclude: /static\/anySign/,
        use: extract([
          'style-loader',
          { loader: 'css-loader', options: { sourceMap, importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap } }
        ], isProduction)
      },
      {
        test: /\.(pug|jade)$/,
        include: src,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:5].[ext]'
        }
      },
      {
        // 将pdf|doc文件打包到对应资料目录
        test: /\.(pdf|doc)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'doc/[name].[ext]?hash=[hash:5]'
        }
      },
      {
        // 将字体打包对字体目录
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:5].[ext]'
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = vuxLoader.merge(baseWebpackConfig, {
  options: { showVuxVersionInfo: false },
  plugins: [ 'vux-ui', 'duplicate-style' ]
})
