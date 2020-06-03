<template>
  <div class="c-container">
    <Refresh @refreshData="$emit('refreshData')" />

    <div class="wrap">
      <Tabs :curIdx.sync="curIdx" />

      <E1 :options="formatOpt[curIdx] || {}" />
    </div>

    <Loading v-if="isLoadingShow" />
  </div>
</template>

<script>
import Refresh from 'cpt/Sub/Refresh'
import Tabs from 'cpt/Manager/Echarts/Tabs';
import E1 from 'cpt/Manager/Echarts/E1';
import Loading from 'cpt/Sub/Loading'
import { mapState } from 'vuex'

export default {
  name: 'EchartsStudent',

  data () {
    return {
      curIdx: -1,
      isLoadingShow: true,
      options: {
        0: {
          title: {
            text: '整体报到人数总览',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 20,
            top: 'center',
            data: ['已报到', '未报到']
          },
          series: [
            {
              name: '人数占比',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        1: {
          title: {
            text: '各学院报到人数占比',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b} : {c}人 ({d}%)'
          },
          legend: {
            orient: 'vertical',
            top: 'center',
            right: 20,
            data: []
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: '学院未报到占比',
              type: 'pie',
              radius: [40, 100],
              center: ['15%', '50%'],
              roseType: 'radius',
              emphasis: {
                label: {
                  show: true
                }
              },
              data: []
            },
            {
              name: '学院已报到占比',
              type: 'pie',
              radius: [40, 110],
              center: ['75%', '50%'],
              roseType: 'area',
              data: []
            }
          ]
        },
        2: {
          title: {
            text: '报到天人数占比',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: [],
            top: 30
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: []
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} 人'
              }
            }
          ],
          series: []
        },
        3: {
          title: {
            text: '各分院报到人数',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['已报到', '未报到', '总人数'],
            top: 30
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '人数',
              axisLabel: {
                formatter: '{value} 人'
              }
            }
          ],
          series: [
            {
              name: '已报到',
              type: 'bar',
              data: [],
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: '未报到',
              type: 'bar',
              data: [],
              markPoint: {
                data: [
                  { name: '年最高' },
                  { name: '年最低' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: '总人数',
              type: 'bar',
              data: []
            }
          ]
        },
        data: {},
        fData: {}
      }
    };
  },

  components: {
    Tabs,
    E1,
    Refresh,
    Loading
  },

  computed: {
    ...mapState(['students']),

    formatOpt () {
      const { students } = this;

      if (!students) {
        return [];
      }

      if (students.length <= 0) {
        this.isLoadingShow = false;
        return [];
      }

      this.formatData(students);
      this.setOptions();
      setTimeout(() => this.isLoadingShow = false, 800);

      return this.options;
    }
  },

  methods: {
    formatData (data) {
      let key = '';

      const res = data.reduce((prev, cur) => {
        key = cur.person_info.university.college;
        !prev[key] && (prev[key] = []);
        return prev[key].push(cur), prev;
      }, {});

      this.data = res;

      const obj = {};
      let is = 0;
      let no = 0;

      for (const prop in res) {
        if (res.hasOwnProperty(prop)) {
          res[prop].forEach((val) => {
            const { value } = val.status;
            is = no = 0;
            value === 1 ? is = 1 : no = 1;

            if (!obj[prop]) {
              obj[prop] = {
                total: res[prop].length
              };
              obj[prop].is_register = [];
              obj[prop].no_register = [];
            }

            is ? obj[prop].is_register.push(val) : obj[prop].no_register.push(val);
          });
        }
      }

      const obj1 = {
        is_register: [],
        no_register: []
      };

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const { is_register, no_register } = obj[key];

          obj1.is_register.push(...is_register);
          obj1.no_register.push(...no_register);
        }
      }

      this.f1Data = obj1;
      this.fData = obj;
    },

    setOptions () {
      this.setZore();
      this.setOne();
      this.setTwo();
      this.setThree();
    },

    setTwo () {
      const { options, fData } = this;
      const xData = [];
      const obj = {};
      const legend = [];
      let _key = '';

      for (const key in fData) {
        if (fData.hasOwnProperty(key)) {
          const value = fData[key];

          value.is_register.forEach(({ status }) => {
            _key = status.date.substr(5, 5);
            if (!obj[_key]) {
              obj[_key] = {};
              xData.push(_key);
            }
            !obj[_key][key] && (obj[_key][key] = 0);
            ++obj[_key][key];
          })
        }
      }

      const res = {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          for (const prop in value) {
            if (value.hasOwnProperty(prop)) {
              const val = value[prop];
              !res[prop] && (res[prop] = []);
              res[prop].push(val);
            }
          }
        }
      }

      const data = [];

      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          const value = res[key];

          legend.push(key);
          data.push({
            name: key,
            data: Object.values(value),
            type: 'bar'
          })
        }
      }

      options[2].legend.data = legend;
      options[2].xAxis[0].data = xData;
      options[2].series = data;
    },

    setZore () {
      const { options, f1Data } = this;
      const data = [];

      for (const key in f1Data) {
        if (f1Data.hasOwnProperty(key)) {
          data.push({
            name: key === 'is_register' ? '已报到' : '未报到',
            value: f1Data[key].length
          })
        }
      }

      options[0].series[0].data = data;
      this.curIdx = 0;
    },

    setOne () {
      const { options, fData } = this;
      const legend = [];
      const isRegisterArr = [];
      const noRegisterArr = [];

      for (const key in fData) {
        if (fData.hasOwnProperty(key)) {
          const value = fData[key];
          legend.push(key);
          isRegisterArr.push({
            name: key,
            value: value.is_register.length
          })
          noRegisterArr.push({
            name: key,
            value: value.no_register.length
          })
        }
      }

      options[1].legend.data = legend;
      options[1].series[0].data = noRegisterArr;
      options[1].series[1].data = isRegisterArr;
    },

    setThree () {
      const { options, fData } = this;
      const xArr = []
      const isRegisterArr = [];
      const noRegisterArr = [];
      const totalArr = [];
      let value = null;

      for (const key in fData) {
        if (fData.hasOwnProperty(key)) {
          value = fData[key];
          xArr.push(key);
          totalArr.push(value.total);
          isRegisterArr.push(value.is_register.length);
          noRegisterArr.push(value.no_register.length);
        }
      }

      options[3].series[0].data = isRegisterArr;
      options[3].series[1].data = noRegisterArr;
      options[3].series[2].data = totalArr;
      options[3].xAxis[0].data = xArr;
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrap {
  border: 1px solid #E4E7ED;
}
</style>
