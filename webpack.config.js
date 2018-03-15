const path = require('path')
const applier = require('./index')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')

let config = {
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    filename: './index.js',
    libraryTarget: 'umd',
    path: path.join(__dirname)
  }
}

module.exports = applier.ts(config)
