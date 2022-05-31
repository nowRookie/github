<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="css" scoped>
  .container{
    height:calc(100% - 50px);
    box-sizing: border-box;
    overflow: auto;
    padding: 20px;
  }
</style>
