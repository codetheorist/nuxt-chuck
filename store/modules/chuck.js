const fs = require('fs')
let db = []
fs.readFile('../../jokes.json', 'utf-8', (err, data) => {
  if(err) { throw err; }
  db = JSON.parse(data)
})
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