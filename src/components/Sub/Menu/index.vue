<template>
  <!-- 侧边菜单 -->
  <div class="menu-wrap" v-if="user">
    <el-menu
      :default-active="$route.name"
      class="el-menu-vertical-demo menu"
      background-color="#444"
      text-color="#fff"
    >
      <!-- 子菜单 -->
      <SubItem
        v-for="(item, idx) of nav"
        :key="idx"
        :item="item"
      />
    </el-menu>
    {{$route.name}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SubItem from './Sub';

export default {
  name: 'LeftMenu',
  props: {
    nav: Array
  },

  components: { SubItem },

  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="stylus" scoped>
.menu-wrap {
  position: relative;
  z-index: 1;
  float: left;
  width: 220px;
  height: 100%;
}

.menu {
  height: 100%;

  >>> .is-active {
    background-color: #222 !important;
    font-weight: bold;
  }
}
</style>
