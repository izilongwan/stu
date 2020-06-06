<template>
  <!-- 登录 -->
  <el-form
    class="form"
    label-width="65px"
    ref="form"
    :status-icon="true"
    :model="form"
    :rules="rules"
  >
    <!-- 账号 -->
    <el-form-item label="账号" prop="account">
      <el-input
        maxlength="6"
        v-model="form.account"
        placeholder="请输入管理员账户"
      ></el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
      <el-input
        maxlength="20"
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item label="验证码" prop="captcha">
      <el-input
        maxlength="4"
        v-model="form.captcha"
        placeholder="请输入验证码"
      ></el-input>

      <img
        class="captcha-img"
        :src="`${ imgSrc }?${ rand }`"
        alt="验证码"
        @click="onRefreshCaptcha"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="btn"
        plain
        @click="submitForm('form')"
      >
        登 录
        <i class="el-icon-thumb el-icon--right"></i>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { managerLogin } from 'api/manager';
import { API } from 'api/config';
import { TOKEN_NAME } from 'config'
import tools from 'utils/tools'

export default {
  name: 'LoginForm',

  data () {
    return {
      imgSrc: API.RANDOM_IMG,
      rand: Date.now(),
      form: {
        role: 'manager',
        account: '',
        password: '',
        captcha: ''
      },
      rules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 6, max: 6, message: '账号长度为6位数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
        ],
      }
    }
  },

  methods: {
    submitForm () {
      const { $refs, form } = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          const res = { ...form };

          res.password = tools.encrypto(res.password);
          this._managerLogin(res);
        }

        this.onRefreshCaptcha();
      })
    },

    onRefreshCaptcha () {
      this.rand = Date.now();
    },

    handleForm (value) {
      this.$refs['form'].clearValidate();
    },

    async _managerLogin (data) {
      const res = await managerLogin(data);

      if (!res) {
        return;
      }

      const { data: { code, msg, token } } = res;
      const opts = {
        showClose: true,
        type: 'warning',
        message: msg
      }

      if (code === 0) {
        opts.type = 'success';
        localStorage.setItem(TOKEN_NAME, token);
        this.$router.push('/manager/echarts/student');
      }
      this.$message(opts);
    }
  }
}
</script>

<style lang="stylus" scoped>
.form {
  width: 300px;
  margin: 0 auto;

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

  .captcha-img {
    position: absolute;
    right: 1px;
    top: 2px;
    width: 105px;
    border-radius: 0 4px 4px 0;
  }
}
</style>
