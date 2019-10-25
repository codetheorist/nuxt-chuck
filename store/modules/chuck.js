const jokes = require('../../jokes.json')

// store/modules/counter.js
export default options => ({
  namespaced: true,
  state: () => ({
    options,
    jokes,
    joke: {}
  }),
  mutations: {
    random(state) {
      state.joke = state.jokes[Math.floor(Math.random() * state.jokes.length)]
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