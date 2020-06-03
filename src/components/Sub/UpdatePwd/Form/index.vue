<template>
  <!-- 修改密码 -->
  <el-form
    ref="form"
    class="form"
    label-width="80px"
    :model="form"
    :rules="rules"
    :status-icon="true"
  >
    <!-- 密码 -->
    <el-form-item label="新密码" prop="password">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>

    <!-- 确认密码 -->
    <el-form-item label="确认密码" prop="cpassword">
      <el-input v-model="form.cpassword" type="password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        style="width: 100%"
        type="primary"
        @click="hanldeSubmit('form')"
      >确 认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex';
import { studentUpdatePwd } from 'api/student';
import { managerUpdatePwd } from 'api/manager';

export default {
  name: 'ChangePwdForm',
  data () {
    const validator = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    };

    return {
      form: {
        password: '',
        cpassword: ''
      },
      rules: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' }
        ],
        cpassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator, trigger: 'blur' }
        ]
      }
    };
  },

  computed: {
    ...mapState(['user'])
  },

  deactivated () {
    this.resetForm();
  },

  methods: {
    hanldeSubmit (form) {
      this.$refs.form.validate((valid) => valid && this.updatePwd(this.form));
    },

    resetForm (form) {
      this.$refs.form.resetFields();
    },

    async updatePwd (data) {
      const { role } = this.user;
      const res =
        await (role === 'student'
          ? studentUpdatePwd(data)
          : managerUpdatePwd(data));

      if (!res) {
        return;
      }

      const {
        data: { code, msg }
      } = res;

      const opts = {
        showClose: true,
        type: 'warning',
        message: msg
      };

      if (code === 0) {
        opts.type = 'success';
        this.resetForm('form');
      }
      this.$message(opts);
    }
  }
};
</script>
