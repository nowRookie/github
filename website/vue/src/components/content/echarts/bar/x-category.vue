<template>
  <div ref="echartRef" :style="{ height: height + 'px' }"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  props: {
    // 优先使用dataset，否则使用xAxis、yAxis
    dataset: { type: Array, default: () => [] },
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
            type: 'bar'
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
      if (this.dataset.length) {
        // 优先使用dataset的值
        if (this.dataset.length > 8) {
          option.grid.bottom = 70
          option.dataZoom = [
            {
              type: 'inside'
            },
            {
              type: 'slider',
              height: 30
            }
          ]
        }
        option.dataset = { source: this.dataset }
        option.xAxis = {
          type: 'category',
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        }
        option.yAxis = {}
        option.legend = { left: 'right', top: '5%' }
        option.series = this.dataset[0]
          .map((unit) => ({ type: 'bar' }))
          .slice(1)
      } else {
        option.xAxis.data = this.xAxis
        option.series[0].data = this.yAxis
      }
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
