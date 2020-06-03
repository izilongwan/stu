<template>
  <div class="c-container">
    <div class="wrap">
      <!-- 标题 -->
      <UpdatePwdLogo />

      <!-- 表单内容 -->
      <UpdatePwdForm />
    </div>
  </div>
</template>

<script>
import UpdatePwdLogo from 'cpt/Sub/UpdatePwd/Logo';
import UpdatePwdForm from 'cpt/Sub/UpdatePwd/Form';

export default {
  name: 'UpdatePwd',
  components: {
    UpdatePwdLogo,
    UpdatePwdForm
  }
}
</script>

<style lang="stylus" scoped>
.c-container {
  .wrap {
    position: absolute;
    top: 40%;
    left: 50%;
    padding: 20px 0;
    background-color: #f6f6f6;
    border-radius: 8px;
    transform: translate(-50%, -50%);
  }
}
</style>
