<template>
  <div id="app">
    <diy-fee v-model="fee" :max="200"></diy-fee>
    <diy-decimal v-model="decimal" :max="200"></diy-decimal>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: function () {
    return {
      fee: "",
      decimal: "",
    };
  },
};
</script>

<style></style>
