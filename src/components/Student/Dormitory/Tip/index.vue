<template>
  <div class="tip">
    <ul class="list">
      <el-tag class="item" v-for="item of list" :key="item">
        <span
          class="badge"
          :class="calculateColor(item)"
        >{{item}}</span>
        <span>表示已住{{item}}人</span>
      </el-tag>
    </ul>
  </div>
</template>

<script>
import tools from 'utils/tools'

export default {
  name: 'DormitoryTip',
  data () {
    return {
      list: [0, 1, 2, 3, 4]
    }
  },

  methods: {
    calculateColor: tools.calculateColor
  }
}
</script>

<style lang="stylus" scoped>
.tip {
  margin: 20px 0;

  .item {
    margin-right: 10px;

    .badge {
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
}
</style>
