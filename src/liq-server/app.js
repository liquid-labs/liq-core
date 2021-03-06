import * as path from 'path'

// import asyncHandler from 'express-async-handler'
import express from 'express'
import fileUpload from 'express-fileupload'

import { handlers } from './handlers'
import { loadPlugins, registerHandlers } from './lib'

const PLUGIN_LABEL = 'plugin:liq-core'

/**
* Options:
* - 'pluginPath': path to the directory containing the package of plugins. appInit expects to find 'package.json' whose
*     dependencies are the plugins to be loaded.
*/
const appInit = ({ skipCorePlugins = false, ...options }) => {
  const { model, reporter } = options
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true })) // handle POST body params
  app.use(fileUpload({ parseNested: true }))
  
  options.cache = new WeakMap()

  app.handlers = []
  
  reporter.log('Loading core handlers...')
  registerHandlers(app, Object.assign({}, options, { sourcePkg:'@liquid-labs/liq-core', handlers }))
  
  if (!skipCorePlugins) {
    loadPlugins(app, options)
  }
  
  return app
}

export { appInit }
