// store/index.js
import chuckModule from './modules/chuck'
// get the options out using lodash templates
const options = JSON.parse(`<%= JSON.stringify(options) %>`)
// extract the namespace var
const { namespace } = options
// create the plugin
export default ({ store }, inject) => {
  // Register the Chuck module using namespace as the name.
  // Chuck module takes the options object and returns an object that is a
  // VueX store defenition
  store.registerModule(namespace, chuckModule(options), {
    preserveState: Boolean(store.state[namespace]) // if the store module already exists, preserve it
  })
}