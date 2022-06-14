<template>
  <el-form>
    <el-row>
      <el-col
        v-for="item in items"
        :key="item.key"
        :span="item.span || span || 24"
      >
        <el-form-item
          :class="item.hide ? 'hide' : 'block h40px'"
          :label-width="item.labelWidth"
          :label="item.title"
          :prop="item.key"
          :required="item.required"
          :rules="
            item.rules
              ? [
                  {
                    required: true,
                    message: `请输入${item.title}`,
                    trigger: 'change'
                  },
                  {
                    required: true,
                    message: `请输入${item.title}`,
                    trigger: 'blur'
                  },
                  { validator: validateTrim, trigger: 'blur' }
                ].concat(item.rules)
              : item.required
              ? [
                  {
                    required: true,
                    message: `请输入${item.title}`,
                    trigger: 'change'
                  },
                  {
                    required: true,
                    message: `请输入${item.title}`,
                    trigger: 'blur'
                  },
                  { validator: validateTrim, trigger: 'blur' }
                ]
              : []
          "
        >
          <div class="row" style="width: 100%">
            <!-- <el-input
              style="flex: 1"
              :maxlength="item.maxlength || 15"
              :value="formData[item.key]"
              @input="(val) => triggerInputFee(item, val)"
              :placeholder="item.placeholder || `请输入${item.title}`"
              @change="(val) => inputChange(item, val)"
              autocomplete="off"
              :disabled="type == 'detail' || item.disabled"
              clearable
            ></el-input> -->
            <span v-if="item.after" class="ml5 w50px tc">{{ item.after }}</span>
          </div>
        </el-form-item></el-col
      >
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'diy-form',
  props: {
    items: {
      type: Array,
      default: []
    },
    span: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped></style>
