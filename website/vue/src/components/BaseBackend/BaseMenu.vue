<template>
  <div>
    <div v-for="(unit, index) in data" :key="index">
      <div v-if="unit.path && unit.isMenu !== false">
        <el-submenu
          :index="unit.$sumPath"
          v-if="unit.children && unit.children.length"
          :sum-path="unit.$sumPath"
        >
          <template slot="title">
            <i :class="['iconfont', unit.icon]"></i>
            <span slot="title">{{ unit.name }}</span>
          </template>
          <basemenu :data="unit.children"></basemenu>
        </el-submenu>
        <router-link :to="unit.$sumPath || ''" v-else>
          <el-menu-item :index="unit.$sumPath" :sum-path="unit.$sumPath">
            <i :class="['iconfont', unit.icon]"></i>
            <span slot="title">{{ unit.name }}</span>
          </el-menu-item>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basemenu',
  components: {},
  props: {
    data: {
      type: Array,
      required: false,
      default: () => []
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
