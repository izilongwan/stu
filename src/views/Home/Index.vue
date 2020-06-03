<template>
  <div class="container">
    <!-- 左侧菜单 -->
    <LeftMenu :nav="NAV" />

    <!-- 右侧内容 -->
    <div class="view c-view">
      <HomeHeader />

      <transition :name="transitionName">
        <keep-alive exclude="PersonInfo">
          <router-view
            @refreshData="refreshData"
            class="child"
          />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import jwtDecode from 'jwt-decode';
import LeftMenu from 'cpt/Sub/Menu';
import HomeHeader from 'cpt/Sub/Header'
import * as APIStudent from 'api/student'
import * as APIManager from 'api/manager'
import * as APIDormitory from 'api/dormitory'
import { TOKEN_NAME, STUDENT_NAV, MANAGER_NAV, SUPER_MANAGER_NAV } from 'config'

export default {
  name: 'Home',
  components: {
    LeftMenu,
    HomeHeader
  },

  data () {
    return {
      role: '',
      transitionName: ''
    }
  },

  created () {
    this.decodeToken();
    this.userGet();
  },

  computed: {
    ...mapState(['user']),

    NAV () {
      const { user } = this;
      if (!user) {
        return [];
      }

      switch (user.role) {
        case 'student':
          return STUDENT_NAV;
          break;
        case 'manager':
          return MANAGER_NAV;
        case 'super_manager':
          return SUPER_MANAGER_NAV;
          break;
        default:
          return [];
          break;
      }
    }
  },

  watch: {
    '$route': 'watchRoute'
  },

  methods: {
    ...mapActions(['SET_USER_INFO', 'SET_USER', 'SET_STUDENTS_INFO', 'SET_DORMITORIES']),

    userGet () {
      const { role } = this.user;

      if (role === 'student') {

        this.studentGet();
        return;
      }

      this.managerGetStudentInfo();
      this.dormitoryGet();
    },

    async studentGet () {
      const res = await APIStudent.studentGet();

      if (!res) {
        return;
      }

      const { data: { code, data } } = res;

      if (code === 0) {
        this.SET_USER_INFO(data);
      }
    },

    async dormitoryGet (text) {
      const res = await APIDormitory.dormitoryGet();

      if (!res) {
        return;
      }

      const { data: { code, data } } = res;
      const conf = {
        type: 'error',
        showClose: true
      }

      if (code === 0) {
        conf.type = 'success';
        this.SET_DORMITORIES(data);
      }

      if (text) {
        conf.message = text;
        this.$message(conf);
      }
    },

    async managerGetStudentInfo (text) {
      const res = await APIManager.managerGetStudentInfo();

      if (!res) {
        return;
      }

      const { data: { code, data, msg } } = res;
      const conf = {
        type: 'error',
        showClose: true
      }

      if (code === 0) {
        this.SET_STUDENTS_INFO([...data]);
        conf.type = 'success';
      }

      if (text) {
        conf.message = text;
        this.$message(conf);
      }
    },

    decodeToken () {
      try {
        const token = localStorage.getItem(TOKEN_NAME),
          user = jwtDecode(token);

        this.SET_USER(user);
        this.role = user.role;
      } catch (err) {
        this.$router.push('/login');
        console.log('err', err)
      }
    },

    watchRoute (to, from) {
      this.transitionName = from.meta.index > to.meta.index
        ? 'slide-up'
        : 'slide-down';

      document.title = to.meta.title;
    },

    refreshData () {
      const { name } = this.$route;

      switch (name) {
        case 'echarts_student':
        case 'form_student':
          this.managerGetStudentInfo('数据刷新成功');
          break;

        case 'echarts_dormitory':
        case 'form_dormitory':
          this.dormitoryGet('数据刷新成功');
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.container {
  display: flex;

  .view {
    position: relative;
    flex: 1;
    background-color: #eee;

    &.print {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 4;
    }

    .child {
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      bottom: 0;
      min-width: 500px;
      margin: 20px 0 0 20px;
      padding: 20px 50px;
      transition: all 0.8s;
      background-color: #fff;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
}
</style>
