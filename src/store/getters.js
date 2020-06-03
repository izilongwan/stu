const getters = {
  DORMITORY_VALUE (state) {
    if (state.user_info && state.user_info.person_info) {
      return state.user_info.person_info.dormitory;
    }
  },

  PAY_INFO (state) {
    const { user_info } = state;

    if (user_info && user_info.person_info) {
      const person_info = user_info.person_info;
      const fee = state.user_info.fee;

      return {
        base: {
          '学号': person_info.s_id,
          '身份证号': person_info.i_id,
          '姓名': person_info.name,
          '院系/专业/班级': getters.GET_UNIVERSITY(state).join(' / '),
          '住宿费': fee.accommodation.toFixed(2),
          '学费': fee.tuition.toFixed(2),
          '合计': fee.total.toFixed(2)
        },
        i_id: person_info.i_id,
        status: fee.status
      }
    }
  },

  GET_UNIVERSITY (state) {
    const { user_info } = state;

    if (user_info && user_info.person_info) {
      const { value} = user_info.person_info.university;

      return typeof value === 'string' ? value.split(' / ') : value;
    }

    return [];
  }
}


export default getters;
