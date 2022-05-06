<template>
  <span>
    <el-input
      v-model="inputVal"
      @click.native="openDialog"
      :placeholder="`请选择${$attrs.title}`"
      v-bind="$attrs"
      readonly
    ></el-input>
  </span>
</template>
<script>
export default {
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: { type: [Array, String], default: () => [] }
  },
  components: {},
  computed: {
    inputVal: {
      get () {
        return this.value.map((unit) => unit.name).join(',')
      },
      set (value) {
        if (value instanceof Array) {
          this.$emit('change', value)
        } else {
          this.$emit('change', [])
        }
        this.$emit('after-opreate')
      }
    },
    defaultCheckedList () {
      return this.value
    },
    dialogType () {
      if (this.$attrs.radio === false) {
        return 'checkbox'
      }
      return 'radio'
    }
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>
<style lang="less" scoped></style>
