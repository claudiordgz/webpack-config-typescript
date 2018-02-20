import { Configuration, NewModule, NewUseRule, NewLoader, Plugin, Resolve, ResolveLoader } from 'webpack'
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

interface IRule extends NewUseRule {
  use: NewLoader[]
}

interface ITSLintRule extends IRule {
  enforce: 'pre' | 'post' | undefined
}

function setDefaultValue (obj, value) {
  return obj === undefined ? value : obj
}

interface NewConfiguration extends Configuration {
  resolve: Resolve
  module: NewModule
  resolveLoader: ResolveLoader
  plugins: Plugin[]
}

// Setup some defaults, similar to webpack-config-safetify
function safetify (cfg): NewConfiguration {
  const config: NewConfiguration = Object.assign({}, cfg)

  /* Don't bundle path, fsevents, and so forth */
  config.target = 'node'

  config.resolve = setDefaultValue(config.resolve, {})
  config.resolve.extensions = setDefaultValue(config.resolve.extensions, [])

  config.module = setDefaultValue(config.module, {})
  config.module.rules = setDefaultValue(config.module.rules, [])

  config.resolveLoader = setDefaultValue(config.resolveLoader, {})
  config.resolveLoader.modules = setDefaultValue(config.resolveLoader.modules, [])

  config.plugins = setDefaultValue(config.plugins, [])

  return config
}

// Main lib, receives user's webpack config and adds typescript and tslint
export function ts (cfg) {
  let config: NewConfiguration = safetify(cfg)

  // exclude some folders, like node_modules
  const mainRule: IRule = Object.assign({
    test: /\.ts$/,
    exclude: /(node_modules|deploy)/,
    use: []
  })

  // tslint has to be executed before tsc
  const tsLintRule: ITSLintRule = Object.assign({
    enforce: 'pre'
  }, mainRule)
  tsLintRule.use.push({
    loader: 'tslint-loader',
    options: {
      typeCheck: true
    }
  })
  mainRule.use.push({ loader: 'cache-loader' })
  mainRule.use.push({
    loader: 'thread-loader',
    options: {
      workers: require('os').cpus().length - 1
    }
  })
  mainRule.use.push({
    loader: 'ts-loader',
    options: {
      happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
    }
  })
  config.module.rules.push(tsLintRule, mainRule)

  Array.from(['.ts', '.tsx', '.js']).forEach((i) => {
    if (config.resolve && config.resolve.extensions) {
      config.resolve.extensions.push(i)
    }
  })

  // Current node_modules and root node_modules have to be included
  if (config.resolveLoader && config.resolveLoader.modules) {
    config.resolveLoader.modules.push(
      path.join(__dirname, 'node_modules'),
      path.join(process.cwd(), 'node_modules')
    )
  }

  config.plugins.push(new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }))

  return config
}
