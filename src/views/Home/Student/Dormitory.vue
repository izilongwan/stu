<template>
  <div class="c-container">
    <template v-if="PAY_INFO && PAY_INFO.status">
      <!-- 提示 -->
      <DormitoryTip />

      <!-- Tabs -->
      <DormitoryTabs :curIdx.sync="curIdx" />

      <div class="content-wrap">
        <!-- 主要内容 -->
        <DormitoryContent
          :dorValue="DORMITORY_VALUE"
          :curDorValue.sync="curDorValue"
          :dor="data[curIdx + 1]"
        />

        <!-- 结果 -->
        <DormitoryRes
          :dorValue="DORMITORY_VALUE"
          :curDorValue.sync="curDorValue"
          @dorChange="(res) => data = formatDor(res)"
        />
      </div>
    </template>

    <!-- 未缴费提示 -->
    <NoNext to="fee" text="还未完成缴费，立刻前往" v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dormitoryGet } from 'api/dormitory'
import DormitoryTip from 'cpt/Student/Dormitory/Tip'
import DormitoryTabs from 'cpt/Student/Dormitory/Tabs'
import DormitoryContent from 'cpt/Student/Dormitory/Content'
import DormitoryRes from 'cpt/Student/Dormitory/Res'
import NoNext from 'cpt/Sub/NoNext'

export default {
  name: 'Dormitory',

  data () {
    return {
      data: [],
      curIdx: 0,
      curDorValue: ''
    }
  },

  components: {
    DormitoryTabs,
    DormitoryContent,
    DormitoryTip,
    DormitoryRes,
    NoNext
  },

  mounted () {
    this._dormitoryGet();

    setTimeout(() => {
      if (this.DORMITORY_VALUE) {
        this.curIdx = this.DORMITORY_VALUE.charAt(6) - 1;
        this.curDorValue = this.DORMITORY_VALUE;
      }
    }, 1000);
  },

  activated () {
    this.$nextTick(() =>
      this.DORMITORY_VALUE && (this.curIdx = this.DORMITORY_VALUE.charAt(6) - 1)
    )
  },

  computed: {
    ...mapGetters(['DORMITORY_VALUE', 'PAY_INFO'])
  },

  methods: {
    async _dormitoryGet () {
      const res = await dormitoryGet();

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
        this.data = this.formatDor(data);
        opts.type = 'success';
      }
      this.$message(opts);
    },

    formatDor (data) {
      let key = null;
      const obj = {};

      data.forEach(val => {
        key = val.value.charAt(0);
        !obj[key] && (obj[key] = []);
        obj[key].push(val);
      })
      return obj;
    }
  }
}
</script>
