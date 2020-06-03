<template>
  <!-- 登录 -->
  <el-form
    class="form"
    label-width="50px"
    ref="form"
    :status-icon="true"
    :model="form"
    :rules="rules"
  >
    <!-- 账号 -->
    <el-form-item label="账号" prop="s_id">
      <el-input
        maxlength="9"
        v-model="form.s_id"
        placeholder="请输入学号 9位"
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
import { studentLogin } from 'api/student';
import { TOKEN_NAME } from 'config'

export default {
  name: 'LoginFormStudent',

  data () {
    return {
      form: {
        s_id: '201600001',
        password: '201600001'
      },
      rules: {
        s_id: [
          { required: true, message: '学号不能为空', trigger: 'blur' },
          { min: 9, max: 9, message: '学号长度为9位数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm (form) {
      this.$refs.form.validate(valid => {
        valid && this._studentLogin(this.form);
      })
    },

    handleForm (value) {
      this.$refs['form'].clearValidate();
    },

    async _studentLogin (data) {
      const res = await studentLogin(data);

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
        localStorage.setItem(TOKEN_NAME, token);
        this.$router.push('/student/guide');
        opts.type = 'success';
      }

      this.$message(opts);
    }
  }
}
</script>

<style lang="stylus" scoped>
.form {
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
}
</style>
