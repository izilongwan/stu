<template>
  <div class="container" ref="container">
    <div class="retireve-pwd">
      <!-- 标题 -->
      <RetirevePwdLogo />

      <!-- 表单内容 -->
      <RetirevePwdForm />

      <!-- 返回登录的提示 -->
      <RetirevePwdTip />
    </div>
  </div>
</template>

<script>
import FireLight from 'js/FireLight'
import RetirevePwdLogo from 'cpt/RetirevePwd/Logo';
import RetirevePwdForm from 'cpt/RetirevePwd/Form';
import RetirevePwdTip from 'cpt/RetirevePwd/Tip';

export default {
  name: 'RetirevePwd',

  components: {
    RetirevePwdLogo,
    RetirevePwdForm,
    RetirevePwdTip
  },

  mounted () {
    const { container } = this.$refs;
    new FireLight(container);
  }
}
</script>

<style lang="stylus" scoped>
.container {
  .retireve-pwd {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    border-radius: 6px;
    background: linear-gradient(200deg, rgba(20, 20, 20, 0) 0%, rgb(200, 200, 200) 100%);
    border-radius: 6px;
    box-shadow: 0 0 15px rgba(250, 250, 250, 0.5);
    transform: translate(-50%, -50%);
    color: #fff;

    >>> label {
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>
