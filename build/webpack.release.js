var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = {
  entry: {
    'vue-fullscreen': './src/index.js'
  },
  output: {
    filename: './dist/[name].js',
    library: 'VueFullscreen',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: projectRoot,
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: require('./vue-loader.conf')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot
      }
    ]
  }
}
