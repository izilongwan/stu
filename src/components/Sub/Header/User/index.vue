<template>
  <div class="user" v-if="user">
    <div class="img-wrap">
      <i
        v-if="user.role === 'student'"
        class="iconfont icon-xuesheng"
      ></i>

      <img
        v-else
        height="100%"
        src="~images/admin.png"
        alt="用户头像"
      />
    </div>

    <div class="info">
      <p class="greet">
        欢迎您，
        <el-tag type="warning" size="mini">{{role}}</el-tag>
      </p>

      <p class="account">
        {{ user.role === 'student' ? user.s_id : user.account }}
        <UserDropdown />
      </p>
    </div>
  </div>
</template>

<script>
import UserDropdown from './Dropdown'
import 'styles/iconfont.css'

export default {
  name: 'HeaderUser',
  props: {
    user: Object,
    avatar: String
  },

  components: { UserDropdown },

  computed: {
    role () {
      const { role } = this.user;

      switch (role) {
        case 'student':
          return '学生';
          break;
        case 'manager':
          return '管理员';
        case 'super_manager':
          return '超级管理员';
        default:
          break;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.user {
  float: right;
  margin-top: 20px;

  .img-wrap {
    float: left;
    width: 40px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 0 3px 1px #ccc;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;

    &:hover {
      box-shadow: 0 0 3px 1px #999;
    }

    .iconfont {
      width: 40px;
      height: 40px;
      font-size: 27px;
    }
  }

  .info {
    float: left;
    color: #666;
    margin-left: 16px;
    line-height: 19px;

    &:hover {
      color: #444;
    }
  }
}</style>
