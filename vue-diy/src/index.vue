<template>
  <div>
    <div class="red">vue file</div>
    <div class="blue">
      <div>blue color</div>
      <div class="txt">txt</div>
    </div>
    <div v-for="(item, index) in list" :key="index">{{ item.name }}</div>
    <img src="../assets/images/1.png" width="150" />
    <div>
      <!-- <diy-fee v-model="decimal"></diy-fee>
      <diy-decimal v-model="decimal"></diy-decimal> -->
      <Example></Example>
    </div>
  </div>
</template>

<script>
import Example from '@/example/index.vue'
export default {
  name: 'index',
  props: {},
  components: { Example },
  data () {
    return {
      decimal: 123,
      list: [{ name: 'zhang' }, { name: 'wang' }, { name: 'li' }]
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
