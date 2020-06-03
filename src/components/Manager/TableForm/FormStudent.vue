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
        :default-sort="{prop: 'university.deparments', order: 'ascending'}"
        stripe
        ref="table"
      >
        <el-table-column type="expand" min-width="100">
          <template slot-scope="props">
            <el-form
              label-position="left"
              class="demo-table-expand"
            >
              <el-form-item label="姓名">
                <span>{{ props.row.person_info.name }}</span>
              </el-form-item>

              <el-form-item label="团员">
                <span>{{ props.row.person_info.league ? '是' : '否' }}</span>
              </el-form-item>

              <el-form-item label="邮箱">
                <span>{{ props.row.person_info.email }}</span>
              </el-form-item>

              <el-form-item label="学号">
                <span>{{ props.row.s_id }}</span>
              </el-form-item>

              <el-form-item label="性别">
                <span>{{props.row.person_info.sex === 'male' ? '男' : '女'}}</span>
              </el-form-item>

              <el-form-item label="家庭地址">
                <span>{{ props.row.person_info.address }}</span>
              </el-form-item>

              <el-form-item label="手机号">
                <span>{{ props.row.person_info.phone }}</span>
              </el-form-item>

              <el-form-item
                label="学院/专业/班级"
              >{{props.row.person_info.university && Object.values(props.row.person_info.university).join(' / ')}}</el-form-item>

              <el-form-item label="宿舍">
                <span>{{props.row.dormitory ? props.row.dormitory : '--'}}</span>
              </el-form-item>

              <el-form-item label="辅导员姓名/电话">
                <span>
                  {{ props.row.person_info.fdy.name }} /
                  {{ props.row.person_info.fdy.phone }}
                </span>
              </el-form-item>

              <el-form-item label="学费">
                <span>{{ props.row.fee.accommodation }}</span>
              </el-form-item>

              <el-form-item label="住宿费">
                <span>{{ props.row.fee.tuition }}</span>
              </el-form-item>

              <el-form-item label="学费">
                <span>{{ props.row.fee.accommodation }}</span>
              </el-form-item>

              <el-form-item label="合计">
                <span>{{ props.row.fee.total }}</span>
              </el-form-item>

              <el-form-item label="缴费状况">
                <el-tag
                  :type="props.row.fee.status ? 'success' : 'info'"
                >{{props.row.fee.status ? '已缴费' : '未缴费'}}</el-tag>
              </el-form-item>

              <el-form-item label="报到情况">
                <el-tag
                  :type="props.row.status.value ? 'success' : 'info'"
                >{{props.row.status.value ? '已报到' : '未报道'}}</el-tag>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

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
              placeholder="请输入学号/姓名进行搜索"
              prefix-icon="el-icon-search"
              clearable
            ></el-input>
          </template>

          <el-table-column
            align="center"
            label="学号"
            prop="s_id"
            sortable
            min-width="65"
          ></el-table-column>

          <el-table-column
            align="center"
            label="姓名"
            min-width="50"
            prop="person_info.name"
          ></el-table-column>
        </el-table-column>

        <el-table-column>
          <template slot="header">
            <el-button @click="handleClearFilter">清除所有过滤器</el-button>
          </template>

          <el-table-column
            align="center"
            label="学院"
            min-width="80"
            prop="university.college"
            :filter-method="(value, row) => row.person_info.university.college === value"
            :filters="filters.college"
          >
            <template slot-scope="props">
              <el-tag
                effect="plain"
              >{{ props.row.person_info.university.college }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            min-width="80"
            label="专业"
            prop="university.deparments"
            sortable
            :filters="filters.deparments"
            :filter-method="(value, row) => value === row.person_info.university.deparments"
          >
            <template slot-scope="props">
              <el-tag
                effect="plain"
              >{{ props.row.person_info.university.deparments }}</el-tag>
            </template>
          </el-table-column>
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
            label="缴费情况"
            width="90"
            :filter-method="(value, row) => value === row.fee.status"
            :filters="filterFee"
            prop="fee.status"
          >
            <template slot-scope="props">
              <el-tag
                :type="props.row.fee.status ? 'success' : 'info'"
              >{{props.row.fee.status === 1 ? '已缴费' : '未缴费'}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="报到状态"
            prop="status.value"
            width="90"
            :filter-method="(value, row) => value === row.status.value"
            :filters="filterStatus"
          >
            <template slot-scope="props">
              <el-tag
                :type="props.row.status.value ? 'success' : 'info'"
              >{{ props.row.status.value === 1 ? '已报到' : '未报到' }}</el-tag>
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
  name: 'AdminTableFormStudent',
  props: {
    tableData: Array,
    filters: Object
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
      searchValue: '',
      filterStatus: [
        { text: '未报到', value: 0 },
        { text: '已报到', value: 1 }
      ],
      filterFee: [
        { text: '未缴费', value: 0 },
        { text: '已缴费', value: 1 }
      ]
    };
  },

  computed: {
    filterData () {
      const { searchValue, tableData } = this;
      const value = searchValue.trim();

      if (!tableData) {
        return [];
      }

      if (tableData.length <= 0) {
        this.$emit('update:isLoadingShow', false);
        return [];
      }

      this.$nextTick(() => this.$emit('update:isLoadingShow', false));
      return value
        ? tableData.filter(
          (val) =>
            val.s_id.includes(value) || val.person_info.name.includes(value)
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
      if (!data) {
        return [
          '汇总',
          '',
          `【】人`,
          '',
          `【】个`,
          `【】个`,
          '',
          ''
        ]
      }

      const res = data.reduce(
        (prev, cur) => {
          const { college, deparments } = cur.person_info.university;

          !prev.college.includes(college) && prev.college.push(college);
          !prev.deparments.includes(deparments) &&
            prev.deparments.push(deparments);
          return prev;
        },
        { college: [], deparments: [] }
      );

      const { college, deparments } = res;

      return [
        '汇总',
        '',
        `【${ data.length }】人`,
        '',
        `【${ college.length }】个`,
        `【${ deparments.length }】个`,
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
    width: 700px;
    margin: 0 auto;
  }
}
</style>
