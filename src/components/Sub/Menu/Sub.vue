<template>
  <!-- 菜单 -->
  <el-submenu v-if="item.children" :index="item.field">
    <template slot="title">
      <i :class="item.icon"></i>

      <span slot="title">{{item.name}}</span>
    </template>

    <router-link
      :to="user.role === 'student'
        ? `/student/${ cItem.to }`
        : `/manager/${ cItem.to }`"
      v-for="(cItem, cIdx) of item.children"
      :key="cIdx"
    >
      <el-menu-item :index="cItem.field">{{cItem.name}}</el-menu-item>
    </router-link>
  </el-submenu>

  <router-link v-else :to="to" class="lk">
    <el-menu-item :index="item.field">
      <i :class="item.icon"></i>

      <span slot="title">{{item.name}}</span>
    </el-menu-item>
  </router-link>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MenuItem',
  props: {
    item: Object
  },

  computed: {
    ...mapState(['user']),

    to () {
      const { user, item } = this;
      const { to } = item;

      return user.role === 'student'
        ? `/student/${ to }`
        : `/manager/${ to }`
    }
  }
}
</script>

<style lang="stylus" scoped>
.lk {
  display: block;
}
</style>
