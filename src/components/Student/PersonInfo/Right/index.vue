<template>
  <!-- 右侧 -->
  <div class="card">
    <el-form
      ref="form"
      label-width="120px"
      :model="form"
      :rules="rules"
    >
      <!-- 用户上传头像 -->
      <el-form-item label="头像" prop="avatar">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          :action="upload"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onChange"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          accept="image/png, image/jpg, image/jpeg"
        >
          <img
            v-if="form.avatar"
            :src="form.avatar"
            class="avatar"
          />

          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="male">男</el-radio>

          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 团员 -->
      <el-form-item label="团员" prop="league">
        <el-radio-group v-model="form.league">
          <el-radio :label="1">是</el-radio>

          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 学院/专业/班级 -->
      <el-form-item label="学院/专业/班级" prop="university">
        <el-cascader
          v-model="form.university.value"
          :options="universityData"
          :props="{ expandTrigger: 'hover'}"
          clearable
        ></el-cascader>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item class="btn-wrap">
        <el-button
          plain
          class="btn"
          type="primary"
          @click="handleSubmit('form')"
        >确 认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import universityData from 'data/university'
import { API } from 'api/config'
import tools from 'utils/tools'

export default {
  name: 'PersonInfoRight',
  props: {
    form: Object
  },

  data () {
    return {
      isAvatarChange: false,
      universityData,
      upload: API.UPLOAD,
      rules: {
        avatar: [{ required: true, message: '请选择上传头像', trigger: 'change' }],
        sex: [{ required: true, message: '未选择性别', trigger: 'change' }],
        league: [{ required: true, message: '未选择团员', trigger: 'change' }],
        university: [{ required: true, message: '未选择学院', trigger: 'change' }]
      }
    }
  },

  methods: {
    handleAvatarSuccess (res, file) {
      if (res && res.code === 0) {
        const { url } = res.data;

        this.form.avatar = url;
        this.isAvatarChange = true;
        this.$emit('studentEdit');
      }
    },

    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }

      return isLt2M;
    },

    onChange ({ raw }) {
      this.form.avatar = tools.getObjURL(raw);
    },

    handleSubmit () {
      const flag = this.$parent.$refs.infoLeft.handleSubmit();
      const { form, $refs, submitOk } = this;

      $refs.form.validate(valid => {
        valid && flag && form.avatar && submitOk()
      })
    },

    submitOk () {
      this.$confirm('确定修改信息?', {
        title: '提示',
        type: 'warning'
      })
        .then(() => this.$refs.upload.submit())
        .then(() =>
          setTimeout(() => {
            !this.isAvatarChange && this.$emit('studentEdit');
            this.isAvatarChange = false;
          }, 300)
        );
    }
  }
}
</script>

<style lang="stylus" scoped>
.card {
  width: 50%;

  .avatar-uploader {
    text-align: center;

    >>> .el-upload {
      border: 1px dashed #d9d9d9;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:hover {
        border-color: #409EFF;
      }

      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }

      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }

  >>> .el-cascader {
    width: 100%;
  }

  .btn-wrap {
    margin-top: 200px;
    text-align: right;

    .btn {
      width: 120px;
    }
  }
}
</style>
