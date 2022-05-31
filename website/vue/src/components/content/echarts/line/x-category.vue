<template>
  <div ref="echartRef" :style="{ height: height + 'px' }"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  props: {
    xAxis: { type: Array, default: () => [] },
    yAxis: { type: Array, default: () => [] },
    title: { type: String, default: '' },
    height: { type: Number, default: 300 }
  },
  components: {},
  computed: {},
  data () {
    return {
      myEcharts: null,
      option: {
        title: { text: this.title, left: 'center' },
        grid: { top: '15%', right: '5%', bottom: '10%', left: '5%' },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        const myEcharts = echarts.init(this.$refs.echartRef)
        this.myEcharts = myEcharts
        this.refresh()
      })
    },
    refresh () {
      const option = this.option
      option.xAxis.data = this.xAxis
      option.series[0].data = this.yAxis
      const myEcharts = this.myEcharts
      myEcharts.clear()
      myEcharts.setOption(option)
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    xAxis (newVal) {
      this.refresh()
    },
    yAxis (newVal) {
      this.refresh()
    },
    dataset (newVal) {
      this.refresh()
    },
    title (newVal) {
      this.option.title.text = newVal
      this.refresh()
    }
  }
}
</script>
<style lang="less" scoped></style>
