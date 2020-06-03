<template>
  <div class="role-wrap">
    <ul class="list">
      <li
        class="item"
        :class="{ cur: role === type }"
        v-for="({ type, text }, idx) of list"
        :key="idx"
        @click="$emit('update:role', type)"
      >{{ text }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LoginRole',

  props: {
    role: String
  },

  data () {
    return {
      list: [
        { type: 'student', text: '学生登录' },
        { type: 'manager', text: '管理员登录' }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.role-wrap {
  margin: -20px -20px 20px 0;
  text-align: right;

  .list {
    display: inline-block;

    .item {
      position: relative;
      padding: 5px 8px;
      color: #ccc;
      font-family: 'MaShanZheng';
      cursor: pointer;
      font-size: 16px;
      transition: color 0.5s;

      &.cur {
        color: #fff;
        font-weight: bold;

        &::before, &::after {
          content: '';
          position: absolute;
          height: 2px;
          background-color: #fff;
        }

        &::before {
          bottom: 4px;
          right: 0;
          width: 8px;
          transform: rotateZ(45deg);
        }

        &::after {
          bottom: 0;
          left: 0;
          width: 100%;
        }
      }
    }
  }
}
</style>
