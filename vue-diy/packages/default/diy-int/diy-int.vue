<template>
  <span>
    <el-input
      v-model="inputVal"
      :placeholder="`请输入${$attrs.title || ''}`"
      v-bind="$attrs"
      @input="(val) => triggerInput($attrs, val)"
    >
      <template slot="prepend"><slot name="prepend"></slot></template>
      <template slot="append"><slot name="append"></slot></template>
    </el-input>
  </span>
</template>
<script>
export default {
  name: 'diy-int',
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: { type: [Number, String], default: '' }
  },
  components: {},
  computed: {
    inputVal: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change', value)
      }
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    triggerInput ($attrs, val) {
      let result = String(val)
        .replace(/[^\d]/g, '') // 只能填数字
        .replace(/^0+$/, '0') // 全部填写0时只显示一个0
        .replace(/^0(\d{1})/g, '$1') // 以0开头的整数，只展示整数部分;
      if ($attrs.max) {
        if (Number(result) > $attrs.max) {
          result = $attrs.max
        }
      }
      if ($attrs.min) {
        if (Number(result) < $attrs.min) {
          result = $attrs.min
        }
      }
      this.inputVal = result
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped></style>
