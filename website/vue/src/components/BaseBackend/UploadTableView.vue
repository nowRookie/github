<template>
  <div class="affix">
    <el-upload
      v-if="!disabled"
      class="upload-demo"
      :name="name"
      :accept="accept"
      :action="uploadAction"
      :headers="uploadHeaders"
      :data="uploadParams"
      :file-list="uploadFileList"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div> -->
    </el-upload>
    <el-table
      class="mt10"
      v-show="currentList.length"
      border
      :data="currentList"
    >
      <el-table-column align="center" label="序号" prop="index" width="55">
        <template slot-scope="scope">
          <span class="ml10">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="名称"
      ></el-table-column>
      <el-table-column align="center" prop="operate" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="downloadFile(scope.row)"
            >下载</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="delRow(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { env } from '@/network/request.js'
import { globalDownloadBaseFileId } from '@/network/global'
export default {
  model: {
    prop: 'fileList',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      default: 'files'
    },
    url: {
      type: String,
      default: '/file/uploadFile'
    },
    headers: {
      type: Object,
      default () {
        return { token: localStorage.getItem('token') }
      }
    },
    params: {
      type: Object,
      default () {
        return { type: 1 }
      }
    },
    accept: {
      type: String,
      default () {
        return '*'
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      uploadFileList: [],
      currentList: [...this.fileList]
    }
  },
  computed: {
    uploadAction () {
      return env + '/file/uploadFile'
    },
    uploadParams () {
      return Object.assign({ type: 1 }, this.params)
    },
    uploadHeaders () {
      return Object.assign(
        { token: localStorage.getItem('token') },
        this.params
      )
    }
  },
  methods: {
    beforeUpload (file) {
      const limit = 10 // M
      const fileSize = file.size / 1024 / 1024 // M
      if (fileSize > limit) {
        this.$message.error(`上传文件不允许超过${limit}M`)
        return false
      }
      this.currentList.push({ name: file.name })
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    httpRequest (params) {
      console.log(222, params)
    },
    uploadSuccess (res, file, fileList) {
      this.loading.close()
      const lastIndex = this.currentList.length - 1
      if (res.code === '200') {
        this.currentList[lastIndex].fileId = res?.data[0]
      } else {
        this.currentList.splice(lastIndex, 1)
      }
      this.$emit('change', [...this.currentList])
    },
    uploadError (error) {
      this.loading.close()
      console.log(error)
      const lastIndex = this.currentList.length - 1
      this.currentList.splice(lastIndex, 1)
    },
    downloadFile (row) {
      globalDownloadBaseFileId(row.id)
    },
    delRow (scope) {
      const index = scope.$index
      this.currentList.splice(index, 1)
      this.$emit('change', [...this.currentList])
    }
  },
  watch: {
    fileList (list) {
      this.currentList = list
    }
  }
}
</script>

<style scoped>
.affix >>> .el-upload-list {
  display: none;
}
</style>
