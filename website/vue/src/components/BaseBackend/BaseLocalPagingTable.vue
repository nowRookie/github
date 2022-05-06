<template>
  <div>
    <el-table
      v-if="basetableData.length"
      ref="multipleTable"
      :data="basetableData"
      border
      highlight-current-row
      style="width: 100%"
      :height="height"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        :selectable="isSelectable"
      ></el-table-column>
      <el-table-column
        :prop="item.key"
        :label="item.title || item.label"
        v-for="(item, index) in basetableItems"
        :key="index"
        align="center"
        :width="item.width || ''"
        :fixed="item.fixed || false"
        :sortable="item.sortable === undefined ? false : item.sortable"
      >
        <template slot-scope="scope">
          <slot
            :name="item.key"
            :index="scope.$index"
            :row="scope.row"
            :column="scope.column"
            v-if="item.type == 'slot'"
          ></slot>
          <slot
            :name="item.slot"
            :index="scope.$index"
            :row="scope.row"
            :column="scope.column"
            v-else-if="item.slot"
          ></slot>
          <span v-else-if="item.type == 'index'">{{ scope.$index + 1 }}</span>
          <span v-else-if="isTemplateFun(item)">{{
            item.template(scope.row)
          }}</span>
          <span v-else>{{ scope.row[item.key] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="btns.length">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="btns.indexOf('修改') > -1"
            @click="editRow(scope)"
            >修改</el-button
          >
          <el-button
            type="text"
            v-if="btns.indexOf('删除') > -1"
            @click="delRow(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="baseTablePages.pageNum || baseTablePages.pageNo"
      :hide-on-single-page="true"
      background
      :page-sizes="baseTablePages.sizes"
      :page-size="baseTablePages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.tableData.length"
      style="margin-top: 15px; text-align: right"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'BaseAddTable',
  model: {
    prop: 'tableData',
    event: 'change'
  },
  props: {
    height: { type: Number, default: 529 },
    items: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    addExtraData: {
      type: Object,
      default: () => ({})
    },
    btns: {
      type: Array,
      default: () => ['修改', '删除']
    }
  },
  components: {},
  computed: {
    basetableItems () {
      return this.items
    },
    basetableData () {
      const { pageNo, pageSize } = this.baseTablePages
      const startIndex = (pageNo - 1) * pageSize
      const endIndex = pageNo * pageSize
      return this.tableData
        .map((unit, index) => ({ ...unit, $realIndex: index }))
        .filter((unit, index) => index >= startIndex && index < endIndex)
    }
  },
  data () {
    return {
      multipleSelection: [],
      baseTablePages: {
        pageNo: 1,
        pageSize: 10,
        sizes: [10, 20, 30, 40, 50]
      }
    }
  },
  methods: {
    isTemplateFun (item) {
      return item.template && item.template instanceof Function
    },
    isSelectable (row, index) {
      if (row.checkable === false) return false
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (pageSize) {
      this.baseTablePages.pageSize = pageSize
    },
    handleCurrentChange (pageNum) {
      this.baseTablePages.pageNo = pageNum
    },
    editRow (scope) {
      const { row } = scope
      this.$emit('operate-edit', row, row.$realIndex)
    },
    delRow (scope) {
      const { row } = scope
      const { $realIndex } = row
      this.$emit(
        'change',
        this.tableData.filter((unit, index) => index !== $realIndex)
      )
      this.$emit('operate-del', row, $realIndex)
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped></style>
