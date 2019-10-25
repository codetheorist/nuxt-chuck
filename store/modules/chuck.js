const jokes = require('../../jokes.json')
let db = []
db = JSON.parse(jokes)

// store/modules/counter.js
export default options => ({
  namespaced: true,
  state: () => ({
    options,
    jokes: db,
    joke: {}
  }),
  mutations: {
    random(state) {
      state.joke = state.db[Math.floor(Math.random() * state.db.length)]
    }
  },
  getters: {
    joke: state => state.joke
  },
  actions: {
    get_random_joke({ commit }) {
      commit('random')
    }
  }
})