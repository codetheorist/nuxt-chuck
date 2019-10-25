// module.js
const { resolve, join } = require('path')
const { readdirSync } = require('fs')
const consola = require('consola')
const logger = consola.withScope('@codetheorist:nuxt-chuck')
export default function(moduleOptions) {
  // get all options for the module
  const options = {
    ...moduleOptions,
    ...this.options.chuck
  }
  // Enforce vuex store because auth depends on it
  if (!this.options.store) {
    logger.fatal('Enable vuex store by creating `store/index.js`.')
  }
  // expose the namespace / set a default
  if (!options.namespace) options.namespace = 'chuck'
  const { namespace } = options

  // add all of the initial plugins
  const pluginsToSync = [
    'components/index.js',
    'store/index.js',
    'plugins/index.js',
    'debug.js',
    'jokes.json',
    'middleware/index.js'
  ]
  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options
    })
  }

  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = ['plugins/helpers', 'store/modules', 'components/lib']
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, pathString, file),
        options
      })
    }
  }
}
module.exports.meta = require('./package.json')