<template>
  <div class="nav-horizontal-menu">
    <el-menu
      :default-active="getCurrentRoute"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item
        v-for="(item, index) in menuListSplit.showing"
        :key="index"
        class="inline-block"
      >
        <a
          v-if="item.meta && item.meta.out_skip"
          :href="'/#' + item.path"
          target="_blank"
        >
          {{ item.name }}
        </a>
        <router-link :to="item.$sumPath" :sum-path="item.$sumPath" v-else>
          {{ item.name }}
        </router-link>
      </el-menu-item>
      <el-submenu index="2" v-if="menuListSplit.hidden.length">
        <template slot="title">更多功能</template>
        <el-menu-item
          v-for="(unit, index) in menuListSplit.hidden"
          :key="index"
          :index="unit.$sumPath"
          :sum-path="unit.$sumPath"
          >{{ unit.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
    <!-- <el-menu
      :default-active="getCurrentRoute"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/workSpace">工作台</el-menu-item>
      <el-menu-item index="1">GIS全景</el-menu-item>
      <el-menu-item index="/AuthoritySystemManagementBackStage"
        >园林管护</el-menu-item
      >
      <el-menu-item index="1">园林事件</el-menu-item>
      <el-menu-item index="1">工程项目</el-menu-item>
      <el-menu-item index="1">古树名木</el-menu-item>
      <el-menu-item index="/IntelligentMaintenanceBackstage"
        >智能养护</el-menu-item
      >
      <el-menu-item index="/GreeningMonitoringBackstage">绿化监控</el-menu-item>
      <el-menu-item index="/parkManagement">公园管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title">更多</template>
        <el-menu-item index="2-1">规划管理</el-menu-item>
        <el-menu-item index="2-1">园林审批</el-menu-item>
        <el-menu-item index="2-2">考勤管理</el-menu-item>
        <el-menu-item index="2-3">绩效考核</el-menu-item>
        <el-menu-item index="2-3">综合评价</el-menu-item>
        <el-menu-item index="2-3">辅助决策</el-menu-item>
        <el-menu-item index="2-3">智能设备</el-menu-item>
        <el-menu-item index="2-3">视频设备</el-menu-item>
        <el-menu-item index="2-3">专家知识库</el-menu-item>
        <el-menu-item index="/AuthoritySystemManagementBackStage"
          >平台综合管理</el-menu-item
        >
      </el-submenu>
    </el-menu> -->
  </div>
</template>
<script>
import { treeToLinearArrayGenerator } from '@/common/utils'
export default {
  data () {
    return { menuList: [] }
  },
  computed: {
    menuListSplit () {
      const splitIndex = 6
      const result = {
        showing: this.menuList.slice(0, splitIndex),
        hidden: []
      }
      if (this.menuList.length > splitIndex) {
        result.hidden = this.menuList.slice(6)
      }
      return result
    },
    getCurrentRoute () {
      return this.$route.matched[0].path
    }
  },
  methods: {
    fixRoutes (list) {
      const permissionList = localStorage.getItem('GlobalMenuPermissionList')
        ? JSON.parse(localStorage.getItem('GlobalMenuPermissionList'))
        : []
      const permissionLinear = treeToLinearArrayGenerator(
        permissionList
      ).filter((unit) => unit.menuType === 0 || unit.menuType === 1)
      console.log('permissionLinear====', permissionLinear)
      const originList = list
      const linearList = []
      const initialLevel = 1 // 初始层级
      const initialPath = ''
      const run = function * (arr, level, parentPath) {
        for (let i = 0; i < arr.length; i++) {
          const itemOrigin = arr[i]
          // const itemOrigin = { ...arr[i] }
          // 添加层级
          itemOrigin.$level = level
          // 路由累加path
          if (itemOrigin.path) {
            if (itemOrigin.path.startsWith('/')) {
              itemOrigin.$sumPath = parentPath + itemOrigin.path
            } else {
              itemOrigin.$sumPath = parentPath + `/${itemOrigin.path}`
            }
          }
          if (/\/:(\w+?)\?$/.test(itemOrigin.$sumPath)) {
            itemOrigin.$sumPath = itemOrigin.$sumPath.replace(
              /\/:(\w+?)\?/g,
              ''
            )
          }
          // if(/\/:(\w+?)$/.test(itemOrigin.$sumPath)){
          //     itemOrigin.$sumPath =itemOrigin.$sumPath.replace(/\/:(\w+?)\?$/,'')
          // }

          yield itemOrigin
          if (itemOrigin.children && itemOrigin.children.length) {
            yield * run(itemOrigin.children, level + 1, itemOrigin.$sumPath)
          }
        }
      }
      const gen = run(originList, initialLevel, initialPath)
      for (const item of gen) {
        linearList.push(item)
      }
      console.log('-----linearList----', linearList)
      return { origin: originList, linear: linearList }
    }
  },
  mounted () {
    debugger
    this.$nextTick(() => {
      const { origin, linear } = this.fixRoutes(this.$router.options.routes)
      console.log('menu=============', origin, linear, this.$router)
      this.menuList = origin.filter((unit) => unit.isMenu !== false)
    })
  }
}
</script>

<style lang="less" scoped>
.nav-horizontal-menu {
  float: left;
  width: calc(100% - 500px);
}

.el-menu--horizontal > .el-menu-item {
  height: 60px;
  line-height: 60px;
}
/deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 60px !important;
  line-height: 60px !important;
  color: white;
}
.el-menu {
  background: none;
}
.el-menu--horizontal > .el-menu-item {
  color: white;
}
/deep/.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: rgba(66, 195, 175, 0.301960784313725) !important;
}
/deep/.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: rgba(66, 195, 175, 0.301960784313725) !important;
}
/deep/.el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  color: white;
}
.el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  color: white;
}
/deep/.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: white;
  background: rgba(28, 147, 153, 1);
}
/deep/.el-menccu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  color: #333333;
}
.is-active {
  background: rgba(66, 195, 175, 0.301960784313725);
}
.el-menu--horizontal .el-menu .el-menu-item.is-active {
  background: var(--color-nav-background);
  color: white;
}
</style>
