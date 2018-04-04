'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const proxyTable = require('./proxyTable')
const { hqApp } = require('./dist')

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: 'inline-source-map',
  output: {
    publicPath: '/',
    filename: 'js/[name].[hash:5].js?'
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /\/modules\/issue\/.*/, to: '/index.html' }
      ]
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: 'localhost',
    port: 8081,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    proxy: proxyTable,
    quiet: false,
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new StyleLintPlugin({
      files: ['*/modules/issue/**/*.vue', '*/modules/issue/**/*.scss', '*/modules/issue/**/*.css'],
      syntax: 'scss'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: hqApp + '/static',
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = devWebpackConfig
