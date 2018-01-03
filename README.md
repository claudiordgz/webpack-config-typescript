# webpack-config-typescript

Life is to short to be copy pasting Webpack configurations that use Typescript and TSLint.

Sadly both will give hell every step of the way.

This are the 3 ingredients you'll need to use this:

1. - Make a webpack configuration with entry and output, such as:

```javascript
const path = require('path')
const cfg = require('webpack-config-typescript')

let config = {
  entry: path.join(__dirname, 'src/handler.ts'),
  output: {
    filename: 'deploy/handler.js',
    libraryTarget: 'commonjs',
    path: path.join(__dirname)
  }
}
module.exports = cfg(config)

```

2. Make a `tsconfig.json`, such as:

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "moduleResolution": "node",
    "noImplicitAny": false,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": false,
    "strict": true
  }
}
```

3. Make a `tslint.json`, such as:

```json
{
  "extends": ["tslint-config-standard"],
  "linterOptions": {
    "exclude": [
      "**/node_modules",
      "**/deploy"
    ]
  },
  "rules": {
    "await-promise": false,
    "no-unused-variable": false
  }
}
```

Why?

Because is not exactly *simple* to put it in a different folder.

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)
