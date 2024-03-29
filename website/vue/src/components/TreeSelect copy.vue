<!--
    /**
     * 下拉选择树形组件，下拉框展示树形结构，提供选择某节点功能，方便其他模块调用
     * @author ljn
     * @date 2019-02-23
     * 调用示例：
     * <tree-select :height="400" // 下拉框中树形高度
     *              :width="200" // 下拉框中树形宽度
     *              :data="data" // 树结构的数据
     *              :defaultProps="defaultProps" // 树结构的props
     *              multiple   // 多选
     *              checkStrictly // 多选时，严格遵循父子不互相关联
     *              :nodeKey="nodeKey"   // 绑定nodeKey，默认绑定'id'
     *              :checkedKeys="defaultCheckedKeys"  // 传递默认选中的节点key组成的数组
     *              @popoverHide="popoverHide"> // 事件有两个参数：第一个是所有选中的节点ID，第二个是所有选中的节点数据
     *              </tree-select>
     */
-->
<template>
  <div>
    <el-popover
      placement="bottom-start"
      :width="width"
      trigger="click"
      @show="$emit('popoverShow', checkedIds, checkedData)"
      @hide="popoverHide"
    >
      <el-tree
        class="scroll common-tree"
        :style="style"
        ref="tree"
        :data="data"
        :props="defaultProps"
        :show-checkbox="multiple"
        :node-key="nodeKey"
        :check-strictly="checkStrictly"
        default-expand-all
        :expand-on-click-node="false"
        :default-checked-keys="defaultCheckedKeys"
        :highlight-current="true"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
      ></el-tree>
      <el-select
        style="width: 100%"
        slot="reference"
        ref="select"
        disabled
        v-model="selectedData"
        :multiple="multiple"
        class="tree-select"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "tree-select",
  props: {
    // 树结构数据
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          children: "children",
          label: "label",
        };
      },
    },
    // 配置是否可多选
    multiple: {
      type: Boolean,
      default() {
        return false;
      },
    },
    nodeKey: {
      type: String,
      default() {
        return "id";
      },
    },
    // 显示复选框情况下，是否严格遵循父子不互相关联
    checkStrictly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // 默认选中的节点key数组
    checkedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    width: {
      type: Number,
      default() {
        return 280;
      },
    },
    height: {
      type: Number,
      default() {
        return 300;
      },
    },
  },
  data() {
    return {
      defaultCheckedKeys: [],
      options: [],
      selectedData: [], // 选中的节点
      style: "height:" + this.height + "px;",
      checkedIds: [],
      checkedData: [],
    };
  },
  methods: {
    popoverHide() {
      if (this.multiple) {
        this.checkedIds = this.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
        this.checkedData = this.$refs.tree.getCheckedNodes(); // 所有被选中的节点所组成的数组数据
      } else {
        this.checkedIds = this.$refs.tree.getCurrentKey();
        this.checkedData = this.$refs.tree.getCurrentNode();
      }
      this.$emit("popoverHide", this.checkedIds, this.checkedData);
    },
    // 节点被点击时的回调,返回被点击的节点数据
    handleNodeClick(data, node) {
      if (!this.multiple) {
        let tmpMap = {};
        tmpMap.value = node.key;
        tmpMap.label = node.label;
        this.options = [];
        this.options.push(tmpMap);
        this.selectedData = node.label;
      }
      this.popoverHide();
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange() {
      var checkedKeys = this.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
      this.options = checkedKeys.map((item) => {
        var node = this.$refs.tree.getNode(item); // 所有被选中的节点对应的node
        let tmpMap = {};
        tmpMap.value = node.key;
        tmpMap.label = node.label;
        return tmpMap;
      });
      this.selectedData = this.options.map((item) => {
        return item.label;
      });
    },
  },
  mounted() {
    if (this.checkedKeys.length > 0) {
      if (this.multiple) {
        this.defaultCheckedKeys = this.checkedKeys;
        this.selectedData = this.checkedKeys.map((item) => {
          var node = this.$refs.tree.getNode(item);
          return node.label;
        });
      } else {
        var item = this.checkedKeys[0];
        this.$refs.tree.setCurrentKey(item);
        var node = this.$refs.tree.getNode(item);
        this.selectedData = node.label;
      }
    }
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
}
.common-tree {
  overflow: auto;
  /deep/.el-tree-node > .el-tree-node__children {
    overflow: visible;
  }
}
.tree-select .el-select__tags .el-tag .el-tag__close {
  display: none;
}
.tree-select .el-select__tags .el-tag .el-icon-close {
  display: none;
}
</style>
