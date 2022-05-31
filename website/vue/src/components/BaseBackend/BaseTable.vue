<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="data"
      border
      highlight-current-row
      style="width: 100%"
      :height="height"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="type == 'selection'"
        type="selection"
        width="55"
        :selectable="selectableFun"
      ></el-table-column>
      <el-table-column
        :prop="item.key"
        :label="item.title"
        v-for="(item, index) in tableItems"
        :key="index"
        align="center"
        :width="item.width || ''"
        :min-width="
          item.width ? item.width : item.type == 'index' ? '50px' : '160px'
        "
        :fixed="
          item.fixed ||
          index === 0 ||
          (index == tableItems.length - 1 ? 'right' : null) ||
          false
        "
        :sortable="item.sortable === undefined ? false : item.sortable"
      >
        <template slot-scope="scope">
          <slot
            :name="item.key"
            :index="scope.$index"
            :row="scope.row"
            :column="scope.column"
            v-if="item.type == 'slot' || item.slot"
          ></slot>
          <span v-else-if="item.type == 'index'">{{ scope.$index + 1 }}</span>
          <el-tooltip
            v-else-if="item.type == 'html'"
            class="item"
            effect="dark"
            :content="item.template(scope.row) + ''"
            placement="top"
          >
            <div class="ellipsis" v-html="item.template(scope.row)"></div>
          </el-tooltip>
          <el-tooltip
            v-else-if="isTemplateFun(item)"
            class="item"
            effect="dark"
            :content="item.template(scope.row) + ''"
            placement="top"
          >
            <div class="ellipsis">{{ item.template(scope.row) }}</div>
          </el-tooltip>
          <el-tooltip
            v-else
            class="item"
            effect="dark"
            :content="scope.row[item.key] + ''"
            placement="top"
          >
            <div class="ellipsis">{{ scope.row[item.key] }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="!(hidePage === true)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.pageNum || pages.pageNo"
      :hide-on-single-page="hideSingle"
      background
      :page-sizes="sizes"
      :page-size="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
      style="margin-top: 15px; text-align: right"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    pages: {
      type: Object || null,
      default: null
    },
    data: {
      type: Array,
      required: true
    },
    height: {
      // type: Number,
      default: null
    },
    hidePage: {
      type: Boolean,
      required: false
    },
    hideSingle: {
      type: Boolean,
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      multipleSelection: []
    }
  },
  computed: {
    tableItems () {
      return this.items.map((unit, index) => {
        if (!unit.key || unit.key === '') {
          unit.key = `key${index}`
        }
        return unit
      })
    },
    sizes () {
      if (this.pages.sizes && this.pages.sizes.length) {
        return this.pages.sizes
      }
      return [10, 20, 30, 40, 50]
    }
  },
  methods: {
    isTemplateFun (item) {
      return item.template && item.template instanceof Function
    },
    selectableFun (row, index) {
      if (row.checkable === false) return false
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (pageSize) {
      this.$emit('change', { pageSize })
    },
    handleCurrentChange (pageNum) {
      this.$emit('change', { pageNum, pageNo: pageNum })
    },
    getChecked () {
      return this.multipleSelection
    }
  },
  mounted () {}
}
</script>

<style lang="css" scoped></style>
