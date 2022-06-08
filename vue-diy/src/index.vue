<template>
  <div>
    <div class="red">vue file</div>
    <div class="blue">blue color</div>
    <div v-for="(item,indx) in list" :key="index">{{item.name}}</div>
    <!-- <img src="./assets/images/1.png" alt=""> -->
  </div>
</template>

<script>
export default {
  name: "index",
  props: {},
  data() {
    return {
      list:[{name:'zhang'},{name:"wang"},{name:"li"}]
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
$blue:blue;
.blue {
  color: $blue;
}
</style>

<style lang="less" scoped>
@theme:red;
.red {
  color: @theme;
}
</style>
