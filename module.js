// module.js
const { resolve, join } = require('path')
import path from 'path'
import fs from 'fs'
import util from 'util'

const readDir = util.promisify(fs.readdir)

const defaultOptions = {
  includeComponent: true,
  globalComponent: false,
  css: true,
  defaultLanguage: 'en',
  languages: undefined,
  languageStemmerMap: {},
  namespace: 'chuck',
  path: 'search-index',
  placeholderText,
  statusMessages,
  ref: 'id',
  fields: [
    'title',
    'body'
  ]
}

module.exports = async function ChuckModule (options = {}) {
  const nuxt = this.nuxt

  options = {
    ...defaultOptions,
    ...nuxt.options.chuck,
    ...options
  }
  // expose the namespace / set a default
  if (!options.namespace) options.namespace = 'chuck'
  const { namespace } = options

  if (options.path !== defaultOptions.path) {
    options.path = options.path.replace(/^\/+|\/+$/g, '')
  }

  this.addTemplate({
    src: path.resolve(__dirname, 'components/lib/ChuckJoke.vue'),
    fileName: 'chuck/ChuckJoke.vue',
    options: {
      ...options
    }
  })

  // add all of the initial plugins
  const pluginsToSync = [
    'store/index.js',
    'plugins/index.js',
    'debug.js',
    'middleware/index.js',
    'jokes.json'
  ]
  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options
    })
  }
  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = ['plugins/helpers', 'store/modules']
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readDir(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, pathString, file),
        options
      })
    }
  }

}
module.exports.meta = require('./package.json')