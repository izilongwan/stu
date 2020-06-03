export default {
  namespaced: true,

  state: {
    SHOW: true,
    NAME: 'show'
  },

  mutations: {
    SET_SHOW (state, payload) {
      state.SHOW = payload;
    }
  },

  actions: {
    SET_SHOW ({ commit }, payload) {
      commit('SET_SHOW', payload);
    }
  }
}
