# webpack-config-typescript

> A Webpack 4 extender to include typescript configuration.

This project was born of using TS on Lambda functions without copy-pasting a giant webpack configuration around. It is still in early stages of development.

It will copy a very opinionated `tsconfig.json` and `tslint.json` into your project in order for you to customize to your liking. I'd rather have a generated of each than extending a base one.

# How to use

```javascript
const path = require('path')
const webpackTs = require('webpack-config-typescript')

let config = {
  entry: path.join(__dirname, 'src/handler.ts'), // <- your entry file
  target: 'node', // <- In case you're making lambda code, remove if not
  output: {
    filename: 'deploy/handler.js', // <- output file
    libraryTarget: 'commonjs', // <- output library type
    path: path.join(__dirname)
  }
}

config = webpackTs.ts(config) // <- this will add the ts-loader and tslint-loader

module.exports = config 
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)
