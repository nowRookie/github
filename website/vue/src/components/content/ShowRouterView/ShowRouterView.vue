<template>
  <div class="routerContaner" :style="{left:routerContainerLeft+'px'}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routerContainerLeft: 264
    }
  },
  methods: {
    changeRouterLeftClose () {
      this.routerContainerLeft = 89
    },
    changeRouterLeftOpen () {
      this.routerContainerLeft = 264
    }
  }
}
</script>
<style lang="css">
  .routerContaner{
    position: absolute;
    top: 88px;
    /* left: 250px; */
    bottom: 24px;
    right: 24px;
    background: var(--color-router-view-background);
    overflow: scroll;
  }
</style>
