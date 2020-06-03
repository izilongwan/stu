<template>
  <div class="tip">
    <router-link class="lk" to="retirevePwd">忘记密码？</router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginTip'
}
</script>

<style lang="stylus" scoped>
.tip {
  text-align: right;

  .lk {
    color: #fff;

    &:hover {
      color: #38f;
    }
  }
}
</style>
