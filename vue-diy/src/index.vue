<template>
  <div>
    <div class="red">vue file</div>
    <div class="blue">blue color</div>
    <div v-for="(item, index) in list" :key="index">{{ item.name }}</div>
    <img src="./assets/images/1.png" width="150">
    <div>
      <diy-fee v-model="fee"></diy-fee>
    </div>
  </div>
</template>

<script>
import DiyFee from "../components/default/diy-fee.vue"
export default {
  name: "index",
  props: {},
  components: { DiyFee },
  data() {
    return {
      fee: 123,
      list: [{ name: 'zhang' }, { name: "wang" }, { name: "li" }]
    };
  },
  computed: {},
  methods: {},
  mounted() { },
  watch: {},
};
</script>

<style lang="scss" scoped>
$blue: blue;

.blue {
  color: $blue;
}
</style>

<style lang="less" scoped>
@theme: red;

.red {
  color: @theme;
}
</style>
