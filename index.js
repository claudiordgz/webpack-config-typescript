const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function setDefaultValue(obj, value) {
	return obj === undefined? value : obj
}

function safetify(cfg) {
  const config = Object.assign({}, cfg)

	config.resolve = setDefaultValue(config.resolve, {})
	config.resolve.extensions = setDefaultValue(config.resolve.extensions, [])

	config.module = setDefaultValue(config.module, {})
  config.module.rules = setDefaultValue(config.module.rules, [])

  config.resolveLoader = setDefaultValue(config.resolveLoader, {})
  config.resolveLoader.modules = setDefaultValue(config.resolveLoader.modules, [])

  config.plugins = setDefaultValue(config.plugins, [])
  
	return config
}

module.exports = function (cfg, opts) {
  const config = safetify(cfg)
  const tsLintRule = {
    test: /\.ts$/,
    enforce: 'pre',
    exclude: /(node_modules|deploy)/,
    use: []
  }
  const mainRule = {
    test: /\.ts$/,
    exclude: /(node_modules|deploy)/,
    use: []
  }
  tsLintRule.use.push({
    loader: 'tslint-loader',
    options: {
      typeCheck: true,
    }
  })
  mainRule.use.push({
    loader: 'ts-loader'
  })
  config.module.rules.push(tsLintRule)
  config.module.rules.push(mainRule)
  Array.from(['.ts']).forEach((i) => {
    config.resolve.extensions.push(i)
  })
  config.resolveLoader.modules.push(
    path.join(__dirname, 'node_modules')
  )
  if (opts && opts.uglify) {
    config.plugins.push(new UglifyJsPlugin())
  }
  return config
}
