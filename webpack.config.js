const path = require('path')
const cfg = require('./index')

let config = {
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    filename: './index.js',
    libraryTarget: 'umd',
    path: path.join(__dirname)
  }
}
module.exports = cfg.ts(config)
