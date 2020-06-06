<template>
  <div class="container" ref="container">
    <div class="login">
      <!-- logo -->
      <LoginLogo />

      <!-- 角色 -->
      <LoginRole :role.sync="role" />

      <!-- 表单内容 -->
      <component :is="componentId" />

      <!-- 忘记密码提示 -->
      <!-- <LoginTip /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FireLight from 'js/FireLight';
import LoginLogo from 'cpt/Login/Logo';
import LoginRole from 'cpt/Login/Role'
import LoginFormStudent from 'cpt/Login/FormStudent';
import LoginFormManager from 'cpt/Login/FormManager'
import LoginTip from 'cpt/Login/Tip';

export default {
  name: 'Login',

  components: {
    LoginLogo,
    LoginRole,
    LoginTip
  },

  data () {
    return {
      role: 'student'
    }
  },

  computed: {
    ...mapState(['user']),
    ...mapState(['list']),

    componentId () {
      const { role } = this;
      switch (role) {
        case 'student':
          return LoginFormStudent;
          break;
        case 'manager':
          return LoginFormManager;
          break;
        default:
          return LoginFormStudent;
          break;
      }
    }
  },

  methods: {
    ...mapActions('show', ['SET_SHOW'])
  },

  mounted () {
    new FireLight(this.$refs.container);
  }
}
</script>

<style lang="stylus" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 20px 25px;
  background: linear-gradient(200deg, rgba(250, 250, 250, 0.2) 0%, rgb(200, 200, 200) 100%);
  border-radius: 6px;
  box-shadow: 0 0 15px rgba(250, 250, 250, 0.5);
  transform: translate(-50%, -50%);
  color: #fff;

  >>> label {
    font-weight: bold;
    color: #fff;
  }
}
</style>
