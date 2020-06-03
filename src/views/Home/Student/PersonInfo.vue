<template>
  <div class="c-container">
    <main class="main" v-if="info">
      <PersonInfoLeft :form="form = info" ref="infoLeft" />

      <PersonInfoRight
        @studentEdit="_studentEdit"
        :form="from = info"
      />
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { studentEdit } from 'api/student'
import PersonInfoLeft from 'cpt/Student/PersonInfo/Left'
import PersonInfoRight from 'cpt/Student/PersonInfo/Right'
import tools from 'utils/tools'

export default {
  name: 'PersonInfo',

  components: {
    PersonInfoLeft,
    PersonInfoRight
  },

  data () {
    return {
      form: {}
    }
  },

  computed: {
    ...mapState(['user_info']),
    ...mapGetters(['GET_UNIVERSITY']),

    info () {
      const { user_info } = this;

      if (user_info && user_info.person_info) {
        const data = { ...user_info.person_info };

        data.university.value = this.GET_UNIVERSITY;
        return data;
      }
    }
  },

  methods: {
    ...mapMutations(['SET_USER_INFO']),

    async _studentEdit () {
      const { form } = this;
      const conf = {
        ...form,
        university: JSON.stringify(form.university)
      }

      const res = await studentEdit(conf);

      if (!res) {
        return;
      }

      const { data: { code, msg, data } } = res;

      const opts = {
        showClose: true,
        type: 'warning',
        message: msg
      }

      if (code === 0) {
        opts.type = 'success';
        this.SET_USER_INFO(data);
      }

      this.$message(opts);
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-container {
  .main {
    margin: 0 5%;
    height: 100%;

    >>> .card {
      float: left;

      label {
        font-weight: bold;
      }
    }
  }
}
</style>
