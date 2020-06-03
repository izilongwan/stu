<template>
  <div class="c-container" v-if="user">
    <!-- 新增管理员按钮 -->
    <AdminHeader @refreshData="_managerGetAll" />

    <!-- 管理员列表 -->
    <AdminTable
      :data="tableData"
      :user="user"
      :account="account"
      @managerEdit="(idx, _id, role) => _managerEdit(idx, _id, role)"
      @managerRemove="(idx, id) => _managerRemove(idx, id)"
    />

    <!-- 管理员表单 -->
    <AdminForm
      :user="user"
      :account="account"
      @managerAdd="(data) => _managerRegister(data)"
    />

    <Loading v-if="isLoadingShow" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AdminHeader from 'cpt/Manager/Admin/Header'
import AdminTable from 'cpt/Manager/Admin/Table'
import AdminForm from 'cpt/Manager/Admin/Form'
import Loading from 'cpt/Sub/Loading'
import { managerGetAll, managerRegister, managerEdit, managerRemove } from 'api/manager'

export default {
  name: 'Admin',
  components: {
    AdminHeader,
    AdminTable,
    AdminForm,
    Loading
  },

  data () {
    return {
      tableData: [],
      account: '000000',
      isLoadingShow: true
    }
  },

  created () {
    this.tableData.length <= 0 && this._managerGetAll();
  },

  computed: {
    ...mapState(['user'])
  },

  methods: {
    async _managerGetAll () {
      this.tableData = [];

      const res = await managerGetAll();

      if (!res) {
        return;
      }

      const { data: { code, msg, data } } = res;
      const conf = {
        type: 'error',
        message: msg,
        showClose: true
      }

      if (code === 0) {
        conf.type = 'success';
        this.tableData = data;
      }

      setTimeout(() => this.isLoadingShow = false, 300);
      this.$message(conf);
    },

    async _managerRegister (conf) {
      const res = await managerRegister(conf);

      if (!res) {
        return;
      }

      const { data: { code, msg, data } } = res;
      const opts = {
        showClose: true,
        type: 'warning',
        message: msg
      }

      if (code === 0) {
        this.tableData.push(data);
        opts.type = 'success';
        this.bus.$emit('handleShowForm', { show: false });
      }

      this.$message(opts);
    },

    async _managerEdit (idx, _id, role) {
      const res = await managerEdit(_id, role);

      if (!res) {
        return;
      }

      const { data: { code, msg, data } } = res;
      const opts = {
        showClose: true,
        type: 'warning',
        message: msg
      }

      if (code === 0) {
        this.tableData[idx].role = data.role;
        opts.type = 'success';
        this.bus.$emit('handleEditClose');
      }

      this.$message(opts);
    },

    async _managerRemove (idx, id) {
      const res = await managerRemove(id);

      if (!res) {
        return;
      }

      const { data: { code, msg } } = res;
      const opts = {
        showClose: true,
        type: 'warning',
        message: msg
      }

      if (code === 0) {
        this.tableData.splice(idx, 1);
        opts.type = 'success';
        this.bus.$emit('handleEditClose');
      }

      this.$message(opts);
    }
  }
}
</script>
