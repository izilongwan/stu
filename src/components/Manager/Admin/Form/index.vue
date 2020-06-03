<template>
  <el-dialog
    title="新增管理员"
    :close-on-click-modal="false"
    :visible.sync="formVisible"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      status-icon
    >
      <!-- 角色 -->
      <el-form-item
        label="角色"
        prop="role"
        label-width="100px"
      >
        <el-select
          v-model="form.role"
          placeholder="请选择管理员权限"
        >
          <el-option
            label="超级管理员"
            value="super_manager"
            :disabled="user.account !== account"
          ></el-option>
          <el-option label="管理员" value="manager"></el-option>
        </el-select>
      </el-form-item>

      <!-- 账号 -->
      <el-form-item
        prop="account"
        label="账号"
        label-width="100px"
      >
        <el-input
          class="input"
          v-model="form.account"
          maxlength="6"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item
        prop="password"
        label="密码"
        label-width="100px"
      >
        <el-input
          class="input"
          type="password"
          v-model="form.password"
          maxlength="20"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 尾部 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">取 消</el-button>
      <el-button
        class="btn"
        type="primary"
        @click="handleForm"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AdminForm',

  props: {
    user: Object,
    account: String
  },

  data () {
    return {
      formVisible: false,
      form: {},
      rules: {
        role: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 6, max: 6, message: '账号长度为6位数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' }
        ]
      }
    }
  },

  mounted () {
    this.bus.$on('handleShowForm', ({ show = true, form = {} }) => {
      this.form = form;
      this.formVisible = show;
    })
  },

  methods: {
    handleForm () {
      this.$refs.form.validate(valid =>
        valid && this.formAdd()
      )
    },

    formAdd () {
      this.$emit('managerAdd', this.form);
    },

    clearForm () {
      this.$refs.form.clearValidate();
    },

    watchFormVisible (val) {
      !val && this.clearForm();
    }
  },

  watch: {
    formVisible: 'watchFormVisible'
  }
}
</script>

<style lang="stylus" scoped>
.input {
  width: 50%;
}

>>> label {
  color: #000;
}

.btn {
  max-width: 120px;
}
</style>
