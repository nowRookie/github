<template>
  <div>
    <NavTop></NavTop>
    <div class="row">
      <NavLeft></NavLeft>
      <div class="container"><router-view></router-view></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NavLeft from "./NavLeft.vue";
import NavTop from "./NavTop.vue";

export default defineComponent({
  components: { NavTop, NavLeft },
  setup() {},
  mounted() {
    console.log(this, this.$route);
  },
});
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
