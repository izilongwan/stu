export default {
  SET_USER (state, user) {
    state.user = user;
  },

  SET_USER_INFO (state, userInfo) {
    state.user_info = userInfo;
  },

  SET_DORMITORY (state, dormitory) {
    state.user_info.person_info.dormitory = dormitory;
  },

  SET_DORMITORIES (state, dormitories) {
    state.dormitories = dormitories;
  },

  SET_STUDENTS_INFO (state, info) {
    state.students = info;
  },

  SET_FEE_STATUS (state, status) {
    state.user_info.fee.status = status;
  }
};
