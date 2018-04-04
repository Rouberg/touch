'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const {hqApp, moduleName, moduleDictionary, src, target} = require('./dist')


const proWebpackConfig = merge(baseWebpackConfig, {
  devtool: false,
  output: {
    // output.path 是webpack打包到的根目录，这是一个绝对路径，一般指向当前项目的dist目录。
    // 当前项目作为横琴项目的一个子模块，所以打包位置输出到横琴的dist目录中的modules/issue目录中
    path: target,
    // output.publicPath是静态资源的公共路径部分, 在为html注入chunk(独立文件)时，会把output.publicPath作为filename的前缀
    // 如果js，css等用文件夹单独组织，常规的设置一般为 '/'
    // 因为output.path订制了，为了静态资源能正确引用，这里也需要为该模块的静态资源设置公共路径 /modules/issue/
    // 注意，得以 '/'开始，进而表示使用绝对路径引用
    // 如果不以 '/'开始，那这就是一个相对路径引用静态资源(当然，这也是合法和可用的)
    publicPath: `/${moduleDictionary}/${moduleName}/`,
    // filename是一个文件名或者一个包含文件名的相对路径，但不能是一个绝对路径，即不能在前面添加 '/'
    filename: 'js/[name].[chunkhash].js',
    // chunkFilename是对非入口chunk指定如何输出
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: path.resolve(target, 'index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      buildTime: new Date(),
      chunksSortMode: 'dependency',
      chunks: ['manifest', 'vendor', 'app']
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 所有的第三方库(node_modules目录下)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.includes('node_modules')
      }
    }),
    // webpack runtime(模块连接器)， manifest(模块名单)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: true,
      children: true,
      minChunks: 3
    }),
  ]
})

// modules/issue/../../static目录下的文件不再需要重复拷贝
// 压缩运维会做，这里不需要gzip了
// 打包分析需要的时候再临时添加

module.exports = proWebpackConfig
