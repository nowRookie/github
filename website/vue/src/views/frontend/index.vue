<template>
  <div class="frontend">
    <div class="p20 relative row">
      <!-- 左侧 -->
      <div class="mr20 oh left">
        <router-view></router-view>
      </div>
      <!-- 右侧 -->
      <div class="right"></div>
      <div class="bgf border p10 fixed">
        <div class="bb between title">
          <span>最新文章</span>
          <a>more></a>
        </div>
        <div class="content">
          <ul>
            <li
              class="mt10 between pointer"
              v-for="(unit, index) in recentNoteList"
              :key="index"
            >
              <span class="title">
                <span>【{{ unit.classifyId.menuName }}】</span>
                <span>{{ unit.title }}</span>
              </span>
              <span class="ml10">{{ formatDate(unit.createTime) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 右下角猫爪链接 -->
    <CatClaw></CatClaw>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions, formatDate } from "@/plugins/utils";

export default {
  name: "frontend",
  data() {
    return {
      recentNoteList: [],
    };
  },
  methods: {
    getRecentNote() {
      const options = getOptions({
        url: "/api/recentNote",
        method: "get",
        params: {},
      });
      axios(options)
        .then((res) => {
          let data = res.data.data || [];
          this.recentNoteList = data;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err || "请求错误",
          });
        });
    },
    formatDate(val) {
      return formatDate({ value: val });
    },
  },
  mounted() {
    this.getRecentNote();
  },
};
</script>

<style lang="less" scoped>
.left {
  flex: 1;
  .icon {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    background: pink;
  }
}
.right {
  width: 400px;
}
.fixed {
  right: 20px;
  top: 20px;
  width: 400px;
  z-index: 2;
  > .title {
    line-height: 32px;
  }
  .content {
    .title {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>