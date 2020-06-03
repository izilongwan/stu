<template>
  <div class="c-container">
    <Refresh @refreshData="$emit('refreshData')" />

    <TableForm
      :isLoadingShow.sync="isLoadingShow"
      :tableData="students"
      :filters="genFilters"
    />

    <Loading v-if="isLoadingShow" />
  </div>
</template>

<script>
import TableForm from 'cpt/Manager/TableForm/FormStudent'
import Refresh from 'cpt/Sub/Refresh'
import Loading from 'cpt/Sub/Loading'
import { mapState } from 'vuex'

export default {
  name: 'FormStudent',

  components: {
    TableForm,
    Refresh,
    Loading
  },

  data () {
    return {
      filters: {
        college: [],
        deparments: []
      },
      isLoadingShow: true
    };
  },

  computed: {
    ...mapState(['students']),

    genFilters () {
      const { students } = this;

      if (!students) {
        return {};
      }

      const obj = students.reduce(
        (prev, cur) => {
          const { college, deparments } = cur.person_info.university;

          !prev.college.includes(college) && prev.college.push(college);
          !prev.deparments.includes(deparments) &&
            prev.deparments.push(deparments);
          return prev;
        },
        { college: [], deparments: [] }
      );

      const filters = {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const val = obj[key];

          if (!val) {
            return;
          }

          filters[key] = val.map((item) => (
            { text: item, value: item }
          ));
        }
      }

      return filters;
    }
  },

  watch: {
    'students.length' (len) {
      console.log(len);

    }
  }
};
</script>
