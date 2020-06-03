import types from './types';

export default {
  SET_USER ({ commit }, user) {
    commit(types.SET_USER, user);
  },

  SET_USER_INFO ({ commit }, userInfo) {
    commit(types.SET_USER_INFO, userInfo);
  },

  SET_DORMITORY ({ commit }, dormitory) {
    commit(types.SET_DORMITORY, dormitory);
  },

  SET_STUDENTS_INFO ({ commit }, info) {
    commit(types.SET_STUDENTS_INFO, info);
  },

  SET_FEE_STATUS ({ commit }, payload) {
    commit('SET_FEE_STATUS', payload);
  },

  SET_DORMITORIES ({ commit }, payload) {
    commit('SET_DORMITORIES', payload);
  }
};
