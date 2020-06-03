<template>
  <div class="card">
    <el-form
      ref="form"
      label-width="120px"
      :model="form"
      :rules="rules"
      :status-icon="true"
    >
      <el-form-item label="学号" prop="s_id">
        <el-input readonly maxlength="9" v-model="form.s_id"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="form.name"
          maxlength="10"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>

      <el-form-item label="身份证号" prop="i_id">
        <el-input
          v-model="form.i_id"
          maxlength="18"
          placeholder="请输入身份证号"
        ></el-input>
      </el-form-item>

      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="form.phone"
          maxlength="11"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>

      <el-form-item label="父亲手机号" prop="phone">
        <el-input
          v-model="form.fa_phone"
          maxlength="11"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>

      <el-form-item label="母亲手机号" prop="phone">
        <el-input
          v-model="form.mo_phone"
          maxlength="11"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input
          type="textarea"
          rows="4"
          maxlength="50"
          show-word-limit
          resize="none"
          placeholder="家庭详细地址……"
          v-model="form.address"
        ></el-input>
      </el-form-item>

      <el-form-item label="辅导员" prop="fdy_name">
        <el-input
          v-model="form.fdy.name"
          maxlength="10"
          readonly
        ></el-input>
      </el-form-item>

      <el-form-item label="辅导员手机" prop="fdy_phone">
        <el-input
          v-model="form.fdy.phone"
          maxlength="11"
          readonly
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tools from 'utils/tools'

export default {
  name: 'PersonInfoLeft',
  props: {
    form: Object
  },

  data () {
    const validator = (rule, value, callback) => {
      if (value.toString().length !== 11) {
        callback(new Error('手机号长度为11位数字'));
      } else {
        callback();
      }
    }

    const validatorId = (rules, value, callback) => {
      if (!tools.checkIdCard(value)) {
        callback(new Error('身份证号不合法'))
      } else {
        callback();
      }
    }

    return {
      rules: {
        'fdy.name': [{ required: true, trigger: 'blur' }],
        'fdy.phone': [{ required: true, trigger: 'blur' }],
        s_id: [{ required: true, trigger: 'blur' }],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱不合法', trigger: 'blur' }
        ],
        i_id: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { min: 18, max: 18, message: '身份证号长度为18位', trigger: 'blur' },
          { validator: validatorId, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator, trigger: 'blur' }
        ],
        address: [{ required: true, message: '地址不能为空', trigger: 'blur' }]
      }
    };
  },

  methods: {
    handleSubmit () {
      let flag = null;
      this.$refs.form.validate(valid => flag = valid);
      return flag;
    }
  }
};
</script>

<style lang="stylus" scoped>
.card {
  margin-right: 10%;
}
</style>
