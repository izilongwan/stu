<template>
  <div class="content">
    <el-radio-group v-model="value" @change="valueChange">
      <div
        class="label"
        v-for="({count, value, max_count, label}) of dor"
        :key="value"
      >
        <el-radio-button
          :disabled="count >= max_count"
          :label="label"
        ></el-radio-button>

        <span
          class="badge"
          :class="calculateColor(count)"
        >{{count}}</span>
      </div>
    </el-radio-group>
  </div>
</template>

<script>
import tools from 'utils/tools'

export default {
  name: 'DormitoryContent',

  props: {
    dor: Array,
    dorValue: String,
    curDorValue: String
  },

  data () {
    return {
      value: ''
    }
  },

  mounted () {
    setTimeout(() => this.value = this.dorValue, 1000);
  },

  activated () {
    this.$nextTick(() => this.value = this.dorValue)
  },

  watch: {
    curDorValue: 'watchCurDorValue'
  },

  methods: {
    calculateColor: tools.calculateColor,

    valueChange (value) {
      this.$emit('update:curDorValue', value);
    },

    watchCurDorValue (val) {
      this.value = val;
    }
  }
}
</script>

<style lang="stylus" scoped>
.label {
  position: relative;
  display: inline-block;
  margin: 0 15px 15px 0;

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    padding: 2px 10px;
    border-radius: 10px;
    z-index: 2;
    color: #fff;
    font-size: 14px;

    &.zore {
      background-color: #67c23a;
    }

    &.one {
      background-color: #e6a23c;
    }

    &.two {
      background-color: #8d66ff;
    }

    &.three {
      background-color: #e6a23c;
    }

    &.four {
      background-color: #dd6161;
    }
  }
}
</style>
