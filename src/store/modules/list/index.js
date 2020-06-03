export default {
  state: {
    LIST: []
  },

  mutations: {
    SET_LIST (state, payload) {
      state.LIST = payload;
    }
  },

  actions: {
    SET_LIST ({ commit }, payload) {
      commit('SET_LIST', payload);
    }
  }
}
