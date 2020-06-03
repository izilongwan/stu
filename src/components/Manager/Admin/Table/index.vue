<template>
  <el-table
    stripe
    :data="tableData"
    show-summary
    max-height="700"
    :summary-method="summary"
    :row-class-name="rowClassName"
  >
    <el-table-column
      align="center"
      label="序号"
      width="100"
      type="index"
      fixed
    ></el-table-column>

    <el-table-column
      align="center"
      label="日期"
      prop="date"
      sortable
    >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span
          class="date"
        >{{ scope.row.date.substr(0, 10) }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="角色"
      prop="role"
      :filters="[
        { text: '管理员', value: 'manager' },
        { text: '超级管理员', value: 'super_manager' }
      ]"
      :filter-method="(val, row) => val === row.role"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          v-show="!isEdit"
          :type="scope.row.role === 'super_manager' ? 'danger' : 'success'"
          effect="plain"
        >{{ scope.row.role === 'super_manager' ? '超级管理员' : '管理员' }}</el-tag>
        <el-select
          v-show="isEdit"
          v-model="scope.row.role"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="user.account !== account"
          ></el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="账号"
      prop="account"
    ></el-table-column>

    <el-table-column
      align="center"
      label="权限描述"
      prop="detail"
    >
      <template slot-scope="scope">
        <p class="detail">
          {{
          scope.row.role === 'super_manager' ? '拥有最高权限' : '拥有部分权限'
          }}
        </p>
      </template>
    </el-table-column>

    <el-table-column>
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="searchValue"
          placeholder="请输入账号进行搜索"
          prefix-icon="el-icon-search"
          clearable
        ></el-input>
      </template>

      <el-table-column align="center" label="操作">
        <template
          slot-scope="scope"
          v-if="user.role === 'super_manager' && scope.row.account !== account"
        >
          <el-button
            v-if="!isEdit"
            type="primary"
            plain
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >编 辑</el-button>

          <template v-else>
            <el-button
              type="success"
              plain
              size="small"
              icon="el-icon-check"
              @click="handleCompleteEdit(scope.$index, scope.row)"
            >完 成</el-button>

            <el-button
              plain
              size="small"
              icon="el-icon-minus"
              @click="handleCancel(scope.$index, scope.row)"
            >返 回</el-button>

            <!-- 删除气泡确定框 -->
            <el-popconfirm
              title="确定删除这货吗？"
              icon="el-icon-info"
              iconColor="red"
              placement="right"
              @onConfirm="$emit('managerRemove', scope.$index, scope.row._id)"
            >
              <el-button
                size="small"
                type="danger"
                plain
                slot="reference"
                class="btn"
                icon="el-icon-close"
              >删 除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import tools from 'utils/tools'

export default {
  name: 'AdminTable',
  props: {
    data: Array,
    user: Object,
    account: String
  },

  data () {
    return {
      tableData: [],
      searchValue: '',
      curIdx: -1,
      isEdit: false,
      options: [
        { value: 'manager', label: '管理员' },
        { value: 'super_manager', label: '超级管理员' }
      ]
    }
  },

  watch: {
    searchValue: {
      handler: 'filterData',
      immediate: true
    }
  },

  activated () {
    this.isEdit = false;
    this.curIdx = -1;
    this.searchValue = '';
  },

  mounted () {
    this.bus.$on('handleEditClose', () => this.setEditStatus(false));
  },

  methods: {
    rowClassName ({ row, rowIndex }) {
      if (!this.isEdit) {
        return '';
      }

      return rowIndex === this.curIdx ? '' : 'disabled';
    },

    handleEdit (idx, row) {
      const { role } = row;

      row._role = role;
      this.curIdx = idx;
      this.setEditStatus(true);
    },

    handleCompleteEdit (idx, { role, _id }) {
      this.$emit('managerEdit', idx, _id, role);
    },

    setEditStatus (status) {
      this.isEdit = status;
      !status && (this.curIdx = -1);
    },

    handleCancel (idx, row) {
      row.role = row._role;
      this.setEditStatus(false);
    },

    summary ({ data, columns }) {
      return [
        '汇总',
        '',
        '',
        `【${ data.length }】人`,
        '',
        ''
      ];
    },

    filterData: tools.debounce(function () {
      const { searchValue, data } = this;
      const value = searchValue.trim();

      if (data.length <= 0) {
        setTimeout(this.filterData, 500);
        return;
      }

      this.tableData = value
        ? data.filter(val => val.account.includes(value))
        : data;
    })
  }
};
</script>

<style lang="stylus" scoped>
.date {
  margin-left: 10px;
}

.detail {
  color: #999;
}

>>> .disabled {
  cursor: not-allowed;

  .el-select, button {
    cursor: not-allowed;
    pointer-events: none;
  }
}

.btn {
  margin-left: 10px;
}
</style>
