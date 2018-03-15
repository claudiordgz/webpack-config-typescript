import { Configuration, NewModule, NewUseRule, NewLoader, Plugin, Resolve, ResolveLoader } from 'webpack'
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

interface IRule extends NewUseRule {
  use: NewLoader[]
}

function setDefaultValue (obj, value) {
  return obj === undefined ? value : obj
}

interface NewConfiguration extends Configuration {
  resolve: Resolve
  module: NewModule
  target?: 'web' | 'webworker' | 'node' | 'async-node' | 'node-webkit' | 'atom' | 'electron' | 'electron-renderer' | 'electron-main' | ((compiler?: any) => void)
  resolveLoader: ResolveLoader
  plugins?: Plugin[]
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
  config.externals = {
    'fork-ts-checker-webpack-plugin': 'fork-ts-checker-webpack-plugin'
  }
  if (config.plugins) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }))
  }

  return config
}
