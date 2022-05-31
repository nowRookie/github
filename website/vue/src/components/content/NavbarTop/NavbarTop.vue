<template>
  <div class="frameworkcontainer">
    <div class="logo">
      <img src="~assets/img/NavbarTop/logo_.png" alt="">
    </div>
    <Menu class="horizontal"/>
    <div class="exit" @click="exit">
      <img src="~assets/img/NavbarTop/newExit.svg" alt="">
    </div>
    <div class="profile" @click="$router.replace('/backstage/profileCenter')">
      <img src="~assets/img/NavbarTop/admin.jpg" alt="">
      <span class="profileName">admin</span>
    </div>
    <div class="info">
      <i class="el-icon-bell"></i>
      <sup>12</sup>
    </div>
    <themePicker style="display: none"/>
  </div>
</template>
<script>
import { exit } from '@/network/login'
import { mapGetters } from 'vuex'
import Menu from './NavbarMenu.vue'
import themePicker from 'components/content/themePicker/index.vue'
export default {
  components: {
    Menu,
    themePicker
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['userInfo', 'systemConfigs'])
  },
  methods: {
    exit () {
      exit().then(res => {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      })
    },
    toFlowPage () {
      window.open(this.systemConfigs.epidemiological_survey_url)
    }
  }
}
</script>
<style lang="less" scoped>
  .info{
    margin-right: 30px;
    position: relative;
    top: 3px;
    float: right;
    sup{
      background-color: #f56c6c;
      border-radius: 10px;
      color: #fff;
      display: inline-block;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
      padding: 0 6px;
      text-align: center;
      white-space: nowrap;
      position: absolute;
      top: 12px;
      right: -18px;
    }
  }
  .el-icon-bell{
    font-size: 20px;
  }
  .profile img{
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border-radius: 50%;
    cursor: pointer;    
  }
  .frameworkcontainer{
    height: 60px;
    /* background: var(--color-nav-background); */
    color: var(--color-nav-text);
    font-size: 14px ;
    background: linear-gradient(90deg,#009595,#009595 200px,#0093aa);
    background-image: cover;
  }
  .frameworkcontainer>div{
    line-height: 60px;
  }
  .logo, .sys-title{
    float:left
  }
  .gis-bar, .flow-regular-management-bar, .profile, .exit{
    float:right;
    cursor: pointer;
  }
  .profile{
    margin-right: 12px;
  }
  .logo{
    /* width: 46px; */
    /* height: 46px; */
    vertical-align: middle;
    /* margin-top: 9px; */
    font-size: 22px;
    margin-left: 10px;
  }
  .logo img, .exit img, .profile img, .flow-regular-management-bar img, .gis-bar img{
    vertical-align: middle;
  }
  .sys-title{
    color: rgb(255, 255, 255);
    display: inline;
    font-family: "PingFang SC ", "PingFang SC", sans-serif;
    font-feature-settings: "kern";
    font-kerning: normal;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    height: auto;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
    text-rendering: optimizelegibility;
    text-transform: none;
    white-space: nowrap;
    margin-left: 20px;
    /* margin-top: 16px; */
  }
  .exit{
    margin-right: 40px;
  }

  .profileName{
    width: 65px;
    display: inline-block;
    position: relative;
    top: 3px;
    left: 4px;
  }
  .flow-regular-management-bar{
    margin-right: 48px;
  }

  .flow-regular-management-bar span{
    position: relative;
    top: 5px;
  }

  .gis-bar{
    margin-right: 48px;
  }
  .gis-bar span{
    position: relative;
    top: 5px;
    left: 0px;
  }
  .horizontal{
    margin-left: 100px;
  }
  .logo img{
    vertical-align: middle;
    margin-left: 38px;
    margin-bottom: 5px;
  }
  
</style>
