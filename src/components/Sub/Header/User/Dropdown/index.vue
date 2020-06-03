<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        icon="el-icon-back"
        command="openConfirm"
      >退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { TOKEN_NAME } from 'config'

export default {
  name: 'HomeDropdown',

  methods: {
    handleCommand (value) {
      switch (value) {
        case 'info':
          this.$router.push('personInfo');
          break;
        case 'openConfirm':
          this.open();
        default:
          break;
      }
    },

    handleLogout () {
      localStorage.removeItem(TOKEN_NAME);
      window.location.href = '/login';
    },

    open () {
      this.$confirm('确定退出登录?', {
        title: '提示',
        type: 'warning'
      })
        .then(() => {
          this.handleLogout();
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        })
    }
  }
};
</script>

<style lang="stylus" scoped>
i {
  color: #999;
}
</style>
