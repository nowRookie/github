<template>
  <div>
    <div>home</div>
    <div>
    <diy-fee v-model="feeVal" :max="200"></diy-fee>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data(){
    return {
      feeVal:""
    }
  },
  setup() {
    return {}
  },
})
</script>
<style lang="scss" scoped>

</style>
