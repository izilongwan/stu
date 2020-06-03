<template>
  <header class="header" v-if="user">
    <HeaderLogo />

    <HeaderBread :user="user" />

    <HeaderUser
      :user="user"
      :avatar="user_info && user_info.avatar"
    />
  </header>
</template>

<script>
import { mapState } from 'vuex'
import HeaderUser from './User'
import HeaderBread from './Bread'
import HeaderLogo from './Logo'

export default {
  name: 'HomeHeader',

  components: {
    HeaderBread,
    HeaderUser,
    HeaderLogo
  },

  computed: {
    ...mapState(['user', 'user_info'])
  }
}
</script>

<style lang="stylus" scoped>
.header {
  position: relative;
  z-index: 1;
  height: 80px;
  padding: 0 50px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
