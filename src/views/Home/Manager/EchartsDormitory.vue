<template>
  <div class="c-container">
    <Refresh @refreshData="$emit('refreshData')" />

    <div class="wrap">
      <E1
        @hanlde-echarts-click="handleEchartsClick"
        :options="formatOpt || {}"
      />
    </div>

    <Loading v-if="isLoadingShow" />
  </div>
</template>

<script>
import Refresh from 'cpt/Sub/Refresh'
import E1 from 'cpt/Manager/Echarts/E1';
import Loading from 'cpt/Sub/Loading'
import { mapState } from 'vuex'
import echarts from 'echarts'

export default {
  name: 'EchartsDors',

  data () {
    return {
      zoomSize: 10,
      curIdx: -1,
      isLoadingShow: true,
      option: {
        title: {
          text: '学生宿舍图表',
          left: 'center'
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          name: '宿舍名称',
          data: [],
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          name: '宿舍人数',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value} 人',
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          { // For shadow
            name: '最多可住人数',
            type: 'bar',
            itemStyle: {
              color: 'rgba(0,0,0,0.05)'
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: [],
            animation: false
          },
          {
            name: '已住人数',
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ]
                )
              }
            },
            data: []
          }
        ]
      }
    }
  },

  components: {
    E1,
    Refresh,
    Loading
  },

  computed: {
    ...mapState(['dormitories']),

    formatOpt () {
      const { dormitories } = this;

      if (!dormitories) {
        return [];
      }

      if (dormitories.length <= 0) {
        this.isLoadingShow = false;
        return;
      }

      const { yData, xData, dataShadow } = this.formatData(dormitories);
      const { option } = this;

      option.xAxis.data = xData;
      option.series[0].data = dataShadow;
      option.series[1].data = yData;
      setTimeout(() => this.isLoadingShow = false, 300);

      return { ...option };
    }
  },

  methods: {
    formatData (data) {
      const res = {
        xData: [],
        yData: [],
        dataShadow: []
      }

      return data.reduce((prev, { count, max_count, label }) => {
        prev.xData.push(label);
        prev.yData.push(count);
        prev.dataShadow.push(max_count);
        return prev;
      }, res)
    },

    handleEchartsClick (e, { dataIndex }) {
      const { zoomSize, option } = this;
      const { xAxis, series } = option;
      const { data } = series[1];

      e.dispatchAction({
        type: 'dataZoom',
        startValue: xAxis.data[Math.max(dataIndex - zoomSize / 2, 0)],
        endValue: xAxis.data[Math.min(dataIndex + zoomSize / 2, data.length - 1)]
      });
    }
  }
}

</script>

<style lang="stylus" scoped>
.wrap {
  border: 1px solid #E4E7ED;
}
</style>
