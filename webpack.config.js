const path = require('path')
const applier = require('./index')

let config = {
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    filename: './index.js',
    libraryTarget: 'umd',
    path: path.join(__dirname)
  }
}

module.exports = applier.ts(config)
