const config = require('../')

module.exports = config({
  entry: __dirname + '/main.ts',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  }
})
