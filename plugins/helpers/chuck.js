import Vue from 'vue'
import ChuckJoke from '../../components/lib/ChuckJoke.vue'

Vue.component('chuck-joke', ChuckJoke)

// plugins/helpers/counter.js
// functions to get, adjust and log the counter in the store
// the store module in question will be created with the namespace
// module option as it's name

// mini function to handle if no store, or no store module
// with our namespace exists
const storeModuleExists = ({ state, namespace }) => {
  if (!state || !state[namespace]) {
    console.error(`${namespace} nuxt module error: store not initialized`)
    return false
  } else {
    return true
  }
}

// function to return the current value of the count
export const value = ({ state, namespace }) => {
  // handle no store:
  if (!storeModuleExists({ state, namespace })) return undefined
  // return the counter vale from the store
  return state[namespace].joke
}

// functions to adjust the counter
export const random = ({ state, store, namespace }) => {
  // handle no store:
  if (!storeModuleExists({ state, namespace })) return undefined
  // the adjustment shoud be of type number, err if not
  // if (typeof adjustment !== 'number') {
  //   return console.error(`${namespace} nuxt module error: adjustment should be of type 'number'.`)
  // }
  // adjust the value of the counter using a store mutation
  return store.commit(`${namespace}/random`)
}

// function to console log the current value of the count
export const log = ({ state, namespace }) => {
  // handle no store:
  if (!storeModuleExists({ state, namespace })) return undefined
  // get the current joke from the store
  const { joke } = state[namespace]
  // console log it
  return console.log(joke)
}