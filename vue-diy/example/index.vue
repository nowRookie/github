<template>
  <div>
    <diy-decimal v-model="formData.decimal"></diy-decimal>
    <diy-form :items="formItems"></diy-form>
  </div>
</template>

<script>
import { content as VueDiyComponents } from '@/packages/index'
console.log('content===', VueDiyComponents)
export default {
  name: 'example',
  props: {},
  components: {},
  data () {
    return {
      formData: {},
      formItems: []
    }
  },
  computed: {},
  methods: {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
$blue: blue;

.blue {
  color: $blue;
  background: url(../assets/images/1.png);
  >>> .txt {
    font-size: 24px;
  }
}
</style>

<style lang="less" scoped>
@theme: red;

.red {
  color: @theme;
}
</style>
