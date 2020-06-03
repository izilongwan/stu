<template>
  <div class="container">
    <ul class="list">
      <li
        class="item"
        :class="{cur: idx === curIdx}"
        v-for="({title, ref, name}, idx) of list"
        :key="idx"
      >
        <h3 class="title">{{title}}</h3>

        <el-upload
          class="upload"
          drag
          action="//"
          list-type="picture"
          :ref="ref"
          :auto-upload="false"
          :limit="1"
          :on-change="(file, fileList) => handleChange(file, fileList, ref, idx)"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          <i class="el-icon-upload"></i>

          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div
            class="el-upload__tip center tip"
            slot="tip"
          >只能上传xls/xlsx文件</div>
        </el-upload>

        <div class="btn-wrap center">
          <el-button
            v-if="file[ref]"
            @click="handleReadData(ref)"
            round
            type="primary"
          >查看本地数据</el-button>

          <el-button
            v-if="file[ref]"
            round
            @click="handleImportData(ref)"
            type="danger"
          >导入数据库</el-button>

          <el-button
            :disabled="disabled(ref)"
            @click="handleExportData(name, ref)"
            round
            type="primary"
          >数据库导出</el-button>
        </div>

        <div
          class="table-wrap"
          v-if="tableHtml[ref]"
          v-html="tableHtml[ref]"
        ></div>
      </li>
    </ul>

    <Loading v-show="isLoadingShow" />
  </div>
</template>

<script>
import tools from "utils/tools";
import { mapState } from "vuex";
import * as API from "api/manager";
import Loading from 'cpt/Sub/Loading'

export default {
  name: 'Data',

  data () {
    return {
      curIdx: -1,
      tableHtml: {
        students: '',
        dormitories: ''
      },
      list: [
        { title: '学生数据导入/导出', ref: 'students', name: '学生数据表' },
        { title: '宿舍数据导入/导出', ref: 'dormitories', name: '宿舍数据表' }
      ],
      file: {
        students: null,
        dormitories: null
      },

      isLoadingShow: false
    }
  },

  components: {
    Loading,
  },

  computed: {
    ...mapState(['students', 'dormitories'])
  },

  deactivated () {
    setTimeout(() => {
      this.isLoadingShow = false;
      this.resetUpload();
    }, 500);
  },

  methods: {
    disabled (ref) {
      return this[ref] && this[ref].length <= 0;
    },

    handleChange ({ raw }, _, ref, idx) {
      this.file[ref] = raw;
      this.curIdx = idx;
    },

    handleExceed (file, fileList) {
      const conf = {
        message: '最多只能上传一个文件',
        showClose: true
      }

      this.$message(conf);
    },

    handleRemove (file) {
      this.resetUpload();
    },

    resetUpload () {
      const { field, $refs, file, tableHtml } = this;

      for (const key in tableHtml) {
        if (this.$refs.hasOwnProperty(key)) {
          const field = this.$refs[key][0];

          field.clearFiles();
          file[key] = null;
          tableHtml[key] = '';
        }
      }
      this.curIdx = -1;
    },

    async formDataTransferSheet (ref) {
      const file = this.file[ref];

      if (!file) {
        return;
      }

      const workbook = await tools.readWorkbookFromLocalFile(file);
      return tools.readWorkbook(workbook);
    },

    async handleReadData (ref) {
      this.isLoadingShow = true;

      const sheet = await this.formDataTransferSheet(ref);

      if (!sheet) {
        this.isLoadingShow = false;
        return;
      }

      const csv = tools.sheetToCsv(sheet);

      this.tableHtml[ref] = tools.csvToTable(csv);
      this.isLoadingShow = false;
    },

    async handleImportData (ref) {
      const sheet = await this.formDataTransferSheet(ref);

      if (!sheet) {
        return;
      }

      const arr = tools.sheetToJson(sheet);
      const data = tools.transferObject({ data: arr });

      this.importData(ref, data);
    },

    async importData (field, data) {
      const { data: { code, msg } } = await API.managerImportData(field, { data });

      const conf = {
        type: 'error',
        message: msg,
        showClose: true
      }

      if (code === 0) {
        conf.message = msg;
        conf.type = 'success';
      }

      this.$nextTick(() => {
        this.resetUpload();
        this.$message(conf);
      })
    },

    async handleExportData (name, ref) {
      let arr = [];
      const conf = {
        type: 'success',
        message: '数据导出成功',
        showClose: true
      }

      switch (ref) {
        case 'students':
          const { students } = this;

          const res = tools.flatObject({ data: students });
          const { data: { code, msg, data } } = await API.managerGetStudentInfo(1);

          if (code === 0) {
            arr = res.map((item, idx) => ({
              ...item,
              password: data[idx].password
            }))
          } else {
            conf.type = 'error';
            conf.message = msg;
            this.$message(conf);
          }
          break;
        case 'dormitories':
          arr = this.dormitories;
          break;
        default:
          break;
      }

      const sheet = tools.jsonToSheet(arr);
      const url = tools.sheetToBlob(sheet);
      tools.openDownloadDialog(url, `${ name }.xlsx`);

      this.$message(conf);
    },
  }
}
</script>

<style lang="stylus" scoped>
.wrap {
  text-align: right;
}

.list {
  margin: 0 auto;
  overflow: hidden;

  .item {
    float: left;
    width: 50%;
    min-height: 100%;
    box-sizing: border-box;

    &:first-child {
      padding-right: 30px;
    }

    &:last-child {
      position: relative;
      padding-left: 30px;
    }

    &.cur {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
    }

    .title {
      line-height: 80px;
      padding-left: 30px;
      font-family: 'MaShanZheng';
      color: #000;
      font-size: 25px;
    }

    .center {
      text-align: center;
    }

    .tip {
      color: #999;
    }

    .upload {
      max-width: 360px;
      margin: 0 auto;
    }

    .btn-wrap {
      margin-top: 50px;
    }

    .table-wrap {
      padding: 30px;
      margin-bottom: 100px;
      overflow: scroll;
    }
  }
}
</style>
