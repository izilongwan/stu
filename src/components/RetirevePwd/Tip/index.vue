<template>
  <div class="tip">
    <router-link class="lk" to="login">已想起密码</router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginTip'
}
</script>

<style lang="stylus" scoped>
.tip {
  margin-bottom: 20px;
  text-align: right;

  .lk {
    color: #fff;

    &:hover {
      color: #38f;
    }
  }
}
</style>
