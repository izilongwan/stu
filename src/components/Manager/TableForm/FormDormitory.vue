<template>
  <div class="table" :class="{print: print}">
    <div class="scroll">
      <el-table
        id="the-table"
        :data="filterData"
        style="width: 100%; min-height: 700px"
        :max-height="maxHeight"
        show-summary
        :summary-method="summary"
        stripe
        ref="table"
      >
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="70"
        ></el-table-column>

        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="searchValue"
              placeholder="请输入宿舍号/学号/姓名进行搜索"
              prefix-icon="el-icon-search"
              clearable
            ></el-input>
          </template>

          <el-table-column
            align="center"
            label="宿舍名称"
            prop="label"
            min-width="100"
          ></el-table-column>

          <el-table-column
            align="center"
            label="宿舍成员学号"
            min-width="60"
            prop="current_student"
          >
            <template
              slot-scope="props"
            >{{props.row.current_student.replace(/_/g, '、')}}</template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <template slot="header">
            <el-button @click="handleClearFilter">清除所有过滤器</el-button>
          </template>

          <el-table-column
            align="center"
            label="宿舍已住人数"
            prop="count"
            :filters="filtersCount"
            :filter-method="(value, row) => row.count === value"
            sortable
          ></el-table-column>

          <el-table-column
            align="center"
            label="宿舍最多可住人数"
            prop="max_count"
          ></el-table-column>
        </el-table-column>

        <el-table-column align="center">
          <template slot="header">
            <el-button
              type="primary"
              @click="handlePrint"
            >生成当前报表信息</el-button>
          </template>

          <el-table-column
            align="center"
            label="宿舍是否住满"
            min-width="90"
            prop="max_count"
            :filters="filtersStatus"
            :filter-method="(value, row) => Math.floor(row.count / row.max_count) === value"
          >
            <template slot-scope="props">
              <el-tag
                :type="props.row.count < props.row.max_count ? 'success' : 'info'"
              >{{props.row.count < props.row.max_count === 1 ? '已住满' : '未住满'}}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import tools from 'utils/tools'

export default {
  name: 'AdminTableForm',
  props: {
    tableData: Array,
    isLoadingShow: Boolean
  },

  created () {
    const before = () => { };
    const after = () => {
      setTimeout(() => {
        this.print = false;
        this.maxHeight = 700;
        document.body.style.height = '100%';
        document.querySelector('.c-view').classList.remove('print');
      }, 300);
    }
    tools.printEvent(before, after);
  },

  data () {
    return {
      print: false,
      maxHeight: 700,
      data: [],
      searchValue: '',
      filtersStatus: [
        { text: '已住满', value: 1 },
        { text: '未住满', value: 0 }
      ],
      filtersCount: [
        { text: '已住0人', value: 0 },
        { text: '已住1人', value: 1 },
        { text: '已住2人', value: 2 },
        { text: '已住3人', value: 3 },
        { text: '已住4人', value: 4 },
      ]
    };
  },

  computed: {
    filterData () {
      const { tableData, searchValue } = this;

      if (!tableData) {
        return [];
      }

      if (tableData.length <= 0) {
        this.$emit('update:isLoadingShow', false)
        return [];
      }

      const value = searchValue.trim();

      this.$nextTick(() => this.$emit('update:isLoadingShow', false));
      return value
        ? tableData.filter(
          (val) =>
            val.value.includes(value) || val.label.includes(value)
        )
        : tableData;
    }
  },

  deactivated () {
    setTimeout(() => {
      this.searchValue = '';
      this.handleClearFilter();
    }, 500);
  },

  methods: {
    summary ({ columns, data }) {
      return [
        '汇总',
        data ? `【${ data.length }】间` : '',
        '',
        '',
        '',
        '',
        ''
      ];
    },

    handleClearFilter () {
      this.$refs.table.clearFilter();
    },

    handlePrint () {
      this.maxHeight = 100000;
      this.print = true;

      document.querySelector('.c-view').classList.add('print');

      setTimeout(() => {
        const { offsetHeight } = document.getElementById('the-table');

        document.body.style.height = offsetHeight + 'px';
        window.print();
      }, 500);
    }
  }
};
</script>

<style lang="stylus" scoped>
>>> .demo-table-expand {
  .el-form-item {
    margin-bottom: 0;
    line-height: 20px;
  }
}

>>> .no-register {
  background-color: #f1f1f1;
}

.print {
  position: absolute;
  z-index: 5;
  top: -53px;
  right: 0;
  left: 0;

  .scroll {
    width: 840px;
    margin: 0 auto;
  }
}
</style>
