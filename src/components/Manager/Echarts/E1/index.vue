<template>
  <div class="e1" ref="e">{{options}}</div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'EchartsE1',

  props: {
    options: Object
  },

  methods: {
    watchOptions (opts) {
      this.echarts.setOption(opts, true);
      this.echarts.resize();
    },

    initEcharts () {
      this.$nextTick(() => {
        const { e } = this.$refs;

        this.echarts = echarts.init(e);
        this.echarts.setOption(this.options);

        window.addEventListener('resize', () => this.echarts.resize(), false);
        this.echarts.on('click', (params) => this.$emit('hanlde-echarts-click', this.echarts, params));
      })
    }
  },

  mounted () {
    this.initEcharts();
  },

  watch: {
    options: 'watchOptions'
  }
}
</script>

<style lang="stylus" scoped>
.e1 {
  width: 100%;
  min-height: 600px;
}
</style>
