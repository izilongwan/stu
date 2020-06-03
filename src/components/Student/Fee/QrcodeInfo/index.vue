<template>
  <el-card class="card" :class="{ fr: isQrShow }">
    <div slot="header" class="clearfix title">
      <i class="icon el-icon-postcard"></i>
      缴纳学费
    </div>

    <div class="content-wrap">
      <div class="input-wrap">
        <input
          maxlength="1"
          type="password"
          class="input"
          v-for="(item, idx) of values"
          @keyup="e => onKeyUp(e, idx)"
          :key="idx"
          ref="inputs"
        />
      </div>
    </div>

    <p class="tip">支付密码为身份证后6位</p>
  </el-card>
</template>

<script>
import { studentPay } from 'api/student'
import { mapActions } from 'vuex'
import { NETWORK_ERROR } from 'config'

export default {
  name: "PayQrcodeInfo",
  props: {
    isQrShow: Boolean
  },

  data () {
    return {
      keys: '1234567890Xx',
      values: ['', '', '', '', '', '']
    }
  },

  activated () {
    this.restoreInputs();
  },

  watch: {
    isQrShow: 'watchIsQrShow'
  },

  methods: {
    ...mapActions(['SET_FEE_STATUS']),

    onKeyUp (e, idx) {
      const { keys, values } = this;
      const { key } = e;
      const { inputs } = this.$refs;
      const len = inputs.length;

      if (key === 'Backspace') {
        if (idx > 0) {
          const item = inputs[idx - 1];

          item.value = '';
          item.focus();
        }
        return;
      }

      if (keys.includes(key)) {
        if (idx <= len - 1) {
          const item = inputs[idx];

          if (!item.value.trim()) {
            return;
          }

          idx < len - 1 && inputs[idx + 1].focus();
          values[idx] = item.value;
          idx === 5 && this.payAction();
        }
        return;
      }

      inputs[idx].value = '';
    },

    async payAction () {
      const { $refs, values, $message } = this;
      const conf = {
        pay: values.join('')
      }

      const res = await studentPay(conf);
      const opts = {
        type: 'warning'
      }

      if (!res) {
        opts.message = NETWORK_ERROR;
        $message(opts);
        return;
      }

      const { data: { code, msg } } = res;

      if (code === 0) {
        this.SET_FEE_STATUS(1);
        opts.type = 'success';
        this.$emit('update:isQrShow', false);
      }

      opts.message = msg;
      $message(opts);
      this.restoreInputs();
    },

    restoreInputs () {
      const { $refs, values } = this;
      const { inputs } = $refs;

      inputs.forEach((item, idx) => {
        idx === 0 && item.focus();
        item.value = '';
        values[idx] = '';
      });
    },

    watchIsQrShow (val) {
      const { inputs } = this.$refs;

      val && inputs[0].focus();
    }
  }
};
</script>

<style lang="stylus" scoped>
.card {
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 380px;

  &.fr {
    z-index: 1;
    transform: translate(50%, -50%);
  }

  .content-wrap {
    margin: 20px 0;
    text-align: center;

    .input-wrap {
      display: inline-block;
      margin: 0 auto;
      border: 1px solid #aaa;
      padding: 10px 0;

      .input {
        width: 40px;
        height: 20px;
        text-align: center;
        border-right: 1px solid #ccc;
        font-weight: bold;
        font-size: 45px;

        &:last-child {
          border-right: none;
        }
      }
    }
  }

  .tip {
    margin-left: 5px;
    color: #999;
  }
}
</style>
