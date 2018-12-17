const path = require('path')
const config = require('../index')

const clientConfig = {
  entry: path.join(__dirname, 'main.ts'),
  output: {
    path: path.join(process.cwd(), 'build'),
    libraryTarget: 'commonjs2',
    filename: 'bundle.js'
  }
}

const tsConfig = config.ts(clientConfig)

module.exports = tsConfig
