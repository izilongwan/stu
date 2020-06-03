<template>
  <div class="bread-wrap" v-if="user">
    <em class="text">{{bread.join(' / ')}}</em>
  </div>
</template>

<script>
import { STUDENT_NAV, MANAGER_NAV, SUPER_MANAGER_NAV } from '@/config'

export default {
  name: 'HeaderBread',
  props: {
    user: undefined || Object
  },

  computed: {
    bread () {
      const arr = [];
      const { user, $route } = this;

      if (user) {
        const { name } = $route;
        let menu = user.role === 'student' ? STUDENT_NAV : MANAGER_NAV;

        switch (user.role) {
          case 'student':
            menu = STUDENT_NAV;
            break;

          case 'manager':
            menu = MANAGER_NAV;
            break;

          case 'super_manager':
            menu = SUPER_MANAGER_NAV;
            break;

          default:
            break;
        }

        const func = (menu) => {
          menu.some(val => {
            if (val.field === name) {
              arr.push(val.name);
            }

            if (val.children) {
              name.includes(val.field) && arr.push(val.name);
              func(val.children);
            }
          })
        }

        func(menu);
      }

      return arr;
    }
  }
}
</script>

<style lang="stylus" scoped>
.bread-wrap {
  float: left;
  height: 100%;

  .text {
    line-height: 80px;
    font-family: 'ZhiMangXing';
    font-size: 25px;
    color: #000;
  }
}
</style>
