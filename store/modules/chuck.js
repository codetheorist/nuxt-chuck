// store/modules/counter.js
export default options => ({
  namespaced: true,
  state: () => ({
    options,
    joke: {}
  }),
  mutations: {
    random(state) {
      state.joke = ''
    }
  },
  getters: {
    count: state => state.joke
  },
  actions: {
    get_random_joke({ commit }) {
      commit('random')
    }
  }
})