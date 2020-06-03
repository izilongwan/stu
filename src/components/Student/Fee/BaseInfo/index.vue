<template>
  <el-card class="card" :class="{ fl: isQrShow }">
    <div slot="header" class="clearfix title">
      <i class="icon el-icon-postcard"></i>
      学生缴费信息
    </div>

    <!-- 信息展示 -->
    <ul class="list">
      <li
        class="item"
        v-for="(item, key) of data.base"
        :key="key"
      >
        <em class="label">{{ key }}</em>
        {{ item }}
      </li>

      <li class="item btn-wrap" v-if="!data.status">
        <el-button @click="$router.push('person_info')">修 改</el-button>

        <el-button
          plain
          class="btn"
          type="primary"
          :loading="isNextLoading"
          :disabled="isDisabled"
          @click="handleNext"
        >下一步</el-button>
      </li>
    </ul>

    <div class="pay-logo" v-if="data.status">
      <img src="~images/pay.png" alt="logo" />
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PayBaseInfo',
  props: {
    data: Object,
    isQrShow: Boolean
  },

  data () {
    return {
      isDisabled: false,
      isNextLoading: false,
      t: null
    };
  },

  deactivated () {
    this.isDisabled = false;
  },

  methods: {
    handleNext () {
      this.isNextLoading = true;
      this.$emit('update:isQrShow', true);

      this.t = setTimeout(() => {
        this.isNextLoading = false;
        this.isDisabled = true;
      }, 1000);
    }
  }
};
</script>

<style lang="stylus" scoped>
.card {
  position: relative;
  float: left;

  &.fl {
    transform: translateX(-30%);
  }
}

.item {
  margin: 15px 0;

  &.btn-wrap {
    margin-top: 30px;
    text-align: right;

    .btn {
      width: 120px;
    }
  }

  .label {
    display: inline-block;
    width: 100px;
    margin-right: 15px;
    text-align: right;
    font-weight: bold;
  }

  .lk {
    display: block;
    height: 100%;
  }
}

.pay-logo {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.icon {
  margin-right: 5px;
  font-size: 20px;
  color: #66b1ff;
}
</style>
