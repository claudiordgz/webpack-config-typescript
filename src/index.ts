import { Configuration, NewModule, NewUseRule, NewLoader } from 'webpack'
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

interface IRule extends NewUseRule {
  use: NewLoader[]
}

interface ITSLintRule extends IRule {
  enforce: 'pre' | 'post' | undefined
}

function setDefaultValue (obj, value) {
  return obj === undefined ? value : obj
}

function safetify (cfg): Configuration {
  const config: Configuration = Object.assign({}, cfg)

  config.target = 'node'
  config.externals = [nodeExternals()]

  config.resolve = setDefaultValue(config.resolve, {})
  if (config.resolve) {
    config.resolve.extensions = setDefaultValue(config.resolve.extensions, [])
  }

  config.module = setDefaultValue(config.module, {})
  if (config.module) {
    (config.module as NewModule).rules = setDefaultValue((config.module as NewModule).rules, [])
  }

  config.resolveLoader = setDefaultValue(config.resolveLoader, {})
  if (config.resolveLoader) {
    config.resolveLoader.modules = setDefaultValue(config.resolveLoader.modules, [])
  }

  config.plugins = setDefaultValue(config.plugins, [])

  return config
}

export function ts (cfg, opts) {
  let config: Configuration = safetify(cfg)
  const mainRule: IRule = Object.assign({
    test: /\.ts$/,
    exclude: /(node_modules|deploy)/,
    use: []
  })
  const tsLintRule: ITSLintRule = Object.assign({
    enforce: 'pre'
  }, mainRule)
  tsLintRule.use.push({
    loader: 'tslint-loader',
    options: {
      typeCheck: true
    }
  })
  mainRule.use.push({
    loader: 'ts-loader'
  })
  if (config.module) {
    (config.module as NewModule).rules.push(tsLintRule, mainRule)
  }
  Array.from(['.ts', '.tsx', '.js']).forEach((i) => {
    if (config.resolve && config.resolve.extensions) {
      config.resolve.extensions.push(i)
    }
  })
  if (config.resolveLoader && config.resolveLoader.modules) {
    config.resolveLoader.modules.push(
      path.join(__dirname, 'node_modules'),
      path.join(process.cwd(), 'node_modules')
    )
  }
  if (config.plugins) {
    config.plugins.push(new UglifyJsPlugin())
  }
  return config
}
