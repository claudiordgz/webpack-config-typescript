# webpack-config-typescript

Write as little webpack configuration needed to bundle Lambda functions written in TypeScript.

## Usage

  1. Install. This will add a barebones `tsconfig` and `tslingt` file into your root folder.
```
$ npm i webpack-config-typescript -D
$ nano webpack.config.js
```

  2. Wrap your webpack configuration using the exported function
```javascript
const path = require('path')
const webpackTs = require('webpack-config-typescript')

let config = {
  entry: path.join(__dirname, 'src/handler.ts'), // <- your entry file
  target: 'node', // <- For Lambdas
  output: {
    filename: 'deploy/handler.js', // <- output file
    libraryTarget: 'commonjs2', // <- output library type
    path: path.join(__dirname)
  }
}

config = webpackTs.ts(config) // <- Here is where it gets configured

module.exports = config 
```

  3. `webpack`
  4. Your src should now be linted, transpiled, and bundled

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)
