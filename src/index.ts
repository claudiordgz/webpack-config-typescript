import { Configuration, Module, RuleSetRule, NewLoader, Plugin, Resolve, ResolveLoader } from 'webpack'
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

interface IRule extends RuleSetRule {
  use: NewLoader[]
}

function setDefaultValue (obj: any, value: {} | []) {
  return obj === undefined ? value : obj
}

interface NewConfiguration extends Configuration {
  mode?: 'production' | 'development'
  resolve: Resolve
  module: Module
  target?: 'web' | 'webworker' | 'node' | 'async-node' | 'node-webkit' | 'atom' | 'electron' | 'electron-renderer' | 'electron-main' | ((compiler?: any) => void)
  resolveLoader: ResolveLoader
  plugins?: Plugin[]
}

// Setup some defaults, similar to webpack-config-safetify
function safetify (cfg: any): NewConfiguration {
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

  if (!('mode' in config)) {
    config.mode = 'development'
  }

  return config
}

// Main lib, receives user's webpack config and adds typescript and tslint
export function ts (cfg: any) {
  let config: NewConfiguration = safetify(cfg)

  // exclude some folders, like node_modules
  const mainRule: IRule = {
    test: /\.ts$/,
    exclude: /(node_modules|deploy)/,
    use: []
  }

  mainRule.use.push({
    loader: 'tslint-loader',
    options: {
      typeCheck: true
    }
  })
  mainRule.use.push({
    loader: 'ts-loader'
  })
  config.module.rules.push(mainRule)

  Array.from(['.js', '.ts', '.tsx']).forEach((i) => {
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
  config.externals = {
    'fork-ts-checker-webpack-plugin': 'fork-ts-checker-webpack-plugin'
  }
  if (config.plugins) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }))
  }

  return config
}
