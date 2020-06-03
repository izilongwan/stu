<template>
  <div class="tabs">
    <ul class="list">
      <li
        class="item"
        :class="{active: curIdx === idx}"
        :key="idx"
        v-for="(item, idx) of list"
        @click="handleTabs(idx)"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DormitoryTabs',

  props: {
    curIdx: Number
  },

  data () {
    return {
      list: ['华林一栋', '华林二栋', '华林三栋', '华林四栋', '华林五栋']
    }
  },

  methods: {
    handleTabs (idx) {
      this.$emit('update:curIdx', idx);
    }
  }
}
</script>


<style lang="stylus" scoped>
.tabs {
  height: 40px;
  margin-bottom: 20px;

  .list {
    position: relative;
    height: 100%;
    float: left;
    border-top: 1px solid #e4e7ed;

    .item {
      float: left;
      width: 120px;
      height: 100%;
      box-sizing: border-box;
      text-align: center;
      line-height: 40px;
      transition: color 0.2s;
      border-bottom: 1px solid #e4e7ed;
      border-left: 1px solid #e4e7ed;

      &:last-child {
        border-right: 1px solid #e4e7ed;
      }

      &.active {
        color: #38f;
        font-weight: bold;
        border-bottom-color: transparent;
      }

      &:hover {
        color: #38f;
      }
    }
  }
}
</style>
