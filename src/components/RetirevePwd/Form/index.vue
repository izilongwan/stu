<template>
  <!-- 找回密码 -->
  <el-form
    label-width="100px"
    ref="form"
    class="form"
    :status-icon="true"
    :model="form"
    :rules="rules"
  >
    <!-- 邮箱 -->
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
    </el-form-item>

    <el-form-item v-if="!isNext">
      <el-button
        type="primary"
        :loading="isLoading"
        @click="handleNext"
      >下一步</el-button>
    </el-form-item>

    <template v-else>
      <!-- 获取验证码按钮 -->
      <el-form-item>
        <el-button
          :disabled="btnDisabled"
          @click="handleGetCode"
        >{{btnTxt}}</el-button>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="重置密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="确认密码" prop="cpassword">
        <el-input
          type="password"
          v-model="form.cpassword"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('form')"
        >确 认</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
export default {
  name: 'RetireveForm',
  data () {
    const validator = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback();
      }
    }

    return {
      btnTxt: '获取邮箱验证码',
      btnDisabled: false,
      isNext: false,
      isLoading: false,
      t: null,
      s: 60,
      _s: 60,
      form: {
        email: 'showy_o@aliyun.com',
        code: '333333',
        password: '666666',
        cpassword: '666666'
      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码长度为6位数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' }
        ],
        cpassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm (form) {
      // this.$refs.form.validate(valid =>
      //   valid && this.studentRetirevePwd(this.form)
      // )
    },

    handleNext () {
      clearTimeout(this.t);
      this.isLoading = true;
      this.t = setTimeout(() => {
        this.isLoading = false;
        this.isNext = true;
      }, 1000);
    },

    handleGetCode () {
      const data = {
        email: this.form.email
      }

      new MailModel()
        .mailSend(data)
        .then((res) => {
          const opts = {
            showClose: true,
            type: 'warning',
            message: res.msg
          }

          if (res && res.code === 0) {
            this.countdown();
            opts.message = '验证码发送成功';
            opts.type = 'success';
          }
          this.$message(opts);
        })
        .catch((err) => console.log('err :', err));
    },

    countdown () {
      clearInterval(this.t);
      this.s = this._s;
      this.t = setInterval(() => {
        if (this.s < 0) {
          this.btnTxt = '获取邮箱验证码';
          this.btnDisabled = false;
        } else {
          this.btnTxt = `重新发送还剩${ --this.s }秒`;
          this.btnDisabled = true;
        }
      }, 1000);
    }
  }
}
</script>

<style lang="stylus" scoped>
>>> input {
  background-color: transparent;
  color: #fff;
}

.btn {
  width: 100%;
}

>>> button {
  background-color: transparent;
  color: #409EFF;
  border-color: #409EFF;
  border-radius: 20px;
}
</style>
