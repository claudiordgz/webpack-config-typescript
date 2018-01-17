const path = require('path')
const config = require('../index')

module.exports = config.ts({
  entry: __dirname + '/main.ts',
  output: {
    path: path.join(process.cwd(), 'build'),
    libraryTarget: 'commonjs',
    filename: 'bundle.js'
  }
})
