<template>
  <div class="wrap">
    <div class="res" v-if="curDorValue">
      <p class="tip" v-show="curDorValue">
        你选择的是
        <em>{{curDorValue }}</em>
      </p>

      <p class="tip" v-show="!curDorValue">还没有选择任何宿舍</p>
    </div>

    <div class="btn-wrap">
      <el-button
        class="btn long"
        :disabled="btnDisabled"
        type="primary"
        @click="_dormitoryEdit"
      >确 认</el-button>

      <el-button class="btn" @click="handleReset">重 置</el-button>
    </div>
  </div>
</template>

<script>
import { dormitoryEdit } from 'api/dormitory'
import { mapActions } from 'vuex'

export default {
  name: 'DormitoryRes',
  props: {
    dorValue: String,
    curDorValue: String
  },

  computed: {
    btnDisabled () {
      return this.dorValue === this.curDorValue;
    }
  },

  activated () {
    this.$nextTick(() => this.handleReset())
  },

  methods: {
    ...mapActions(['SET_DORMITORY']),

    handleReset () {
      this.$emit('update:curDorValue', this.dorValue);
    },

    async _dormitoryEdit () {
      const conf = { label: this.curDorValue };
      const res = await dormitoryEdit(conf);

      if (!res) {
        return;
      }

      const { data: { code, data, msg } } = res;

      const opts = {
        showClose: true,
        type: 'warning',
        message: msg
      }

      if (code === 0) {
        this.$emit('dorChange', data);
        this.SET_DORMITORY(this.curDorValue);
        opts.type = 'success';
      }

      this.$message(opts);
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrap {
  margin-top: 70px;
  line-height: 40px;
  text-align: right;
  margin-right: 100px;

  .res {
    float: left;
    color: #f55;

    .tip {
      padding: 0 15px;
      background-color: #444;
      color: #fff;
    }
  }

  .btn-wrap {
    .long {
      width: 120px;
    }
  }
}
</style>
