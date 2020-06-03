<template>
  <div class="tabs">
    <ul class="list clearfix">
      <li
        class="item"
        :class="{current: idx === curIdx}"
        v-for="(item, idx) of list"
        @click="hanldeTabs(idx)"
        :key="idx"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
import E1 from '../E1'

export default {
  name: 'EchartsTabs',

  props: {
    curIdx: Number
  },

  components: {
    E1
  },

  data () {
    return {
      list: ['图 一', '图 二', '图 三', '图 四']
    }
  },

  methods: {
    hanldeTabs (idx) {
      const { curIdx } = this;

      idx !== curIdx && this.$emit('update:curIdx', idx);
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs {
  background-color: #F5F7FA;
  height: 45px;

  .list {
    .item {
      float: left;
      padding: 15px 20px;
      border-right: 1px solid #E4E7ED;
      border-bottom: 1px solid #E4E7ED;

      &:hover {
        color: #38f;
      }

      &.current {
        color: #38f;
        font-weight: bold;
        background-color: #fff;
        border-bottom-color: transparent;
      }
    }
  }
}
</style>
