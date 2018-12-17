# webpack-config-typescript

> A Webpack 4 extender to include typescript configuration.

## GOAL

To write as little webpack configuration needed to bundle lambda functions.

  1. Install
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

  3. 

It will copy a very opinionated `tsconfig.json` and `tslint.json` into your project in order for you to customize to your liking. I'd rather have a generated of each than extending a base one.

# How to use



## License

[MIT](http://www.opensource.org/licenses/mit-license.php)
