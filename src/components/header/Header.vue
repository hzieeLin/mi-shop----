<template>
  <div>
    <nav>
      <a href="/home">小米商城</a><span class="sep">|</span>
      <a href="javascript:;">MIUI</a><span class="sep">|</span>
      <a href="javascript:;">loT</a><span class="sep">|</span>
      <a href="javascript:;">云服务</a><span class="sep">|</span>
      <a href="javascript:;">天星数科</a><span class="sep">|</span>
      <a href="javascript:;">有品</a><span class="sep">|</span>
      <a href="javascript:;">小爱开发平台</a><span class="sep">|</span>
      <a href="javascript:;">企业团购</a><span class="sep">|</span>
      <a href="javascript:;">资质证照</a><span class="sep">|</span>
      <a href="javascript:;">协议规则</a><span class="sep">|</span>
      <a href="javascript:;">下载app</a><span class="sep">|</span>
      <a href="javascript:;">智能生活</a><span class="sep">|</span>
      <a href="javascript:;">Select Location</a>
      <a href="javascript:;" class="header_a_login">登录</a><span class="sep">|</span>
      <a href="javascript:;">注册</a><span class="sep">|</span>
      <a href="javascript:;">消息通知</a><span class="sep">|</span>
      <a href="javascript:;">购物车</a>
    </nav>
    <div class="header_nav">
      <div class="logo">
        <img src="https://s02.mifile.cn/assets/static/image/logo-mi2.png" alt="">
      </div>
      <ul class="header_title" >
        <Topnav catetitle="Xiaomi手机"></Topnav>
        <Topnav catetitle="Redmi红米"></Topnav>
        <Topnav catetitle="电视"></Topnav>
        <Topnav catetitle="笔记本"></Topnav>
        <Topnav catetitle="平板"></Topnav>
        <Topnav catetitle="家电"></Topnav>
        <Topnav catetitle="路由器"></Topnav>
        <Topnav catetitle="服务"></Topnav>
        <Topnav catetitle="社区"></Topnav>
      </ul>
        <div class="div_select">
          <form action="" class="search-form clearfix">
            <input
                @focus="changeSearch"
                @blur="disChangeSearch"
                id="input"
                type="text"
                placeholder="小米11"
            />
            <div class="search" id="search">
              <i class="iconfont icon-chaxun"></i>
            </div>
          </form>
          <div class="searchRecommend" id="searchRecommend">
            <div class="recommendedItem">全部商品</div>
            <div class="recommendedItem">手机</div>
            <div class="recommendedItem">螺丝刀</div>
            <div class="recommendedItem">黑鲨4S</div>
            <div class="recommendedItem">空调</div>
            <div class="recommendedItem">耳机</div>
            <div class="recommendedItem">净水器</div>
            <div class="recommendedItem">红米</div>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import Topnav from "@/components/header/Topnav";
export default {
  components: {
    Topnav
  },
  methods: {
    changeSearch() {
      let search = document.getElementById('search')
      search.style.borderColor = "red";
      let searchRecommend = document.getElementById("searchRecommend");
      searchRecommend.style.display = "block";
    },
    disChangeSearch() {
      let search = document.getElementById("search");
      search.style.borderColor = "#d7d7d7";
      let searchRecommend = document.getElementById("searchRecommend");
      searchRecommend.style.display = "none";
    }
  }
}
</script>

<style lang="less" scoped>
nav {
  padding-left: 150px;
  background-color: #333;
}

nav a {
  font-size: 12px;
  color: #b0b0b0;
  line-height: 40px;
  margin:auto 2px;
  text-decoration: none;
}
nav a:hover {
  color: #ffffff;
}

span {
  color: #424242;
  margin: 0 0.3em;
}
.header_a_login {
  margin-left: 120px;
}
.header_nav {
  margin: 0 auto;
  height: 100px;
  width: 100%;
}
.logo {
  height: 100%;
  background-color: #ffffff;
  width: 230px;
  margin-left: 150px;
  float: left;
  img {
    width: 56px;
    height: 56px;
    margin-top: 22px;
  }
}
.header_title {
  height: 100px;
  width: 630px;
  margin: 0;
  float: left;
  padding: 0;
}
.div_select {
  display: inline;
  width: 295px;
  float: left;
}
.div_select input {
  margin-top: 10px;
  height: 50px;
  width: 245px;
}
#searchRecommend {
  display: none;
  width: 235px;
  border-left: 1px solid #999999;
  border-right: 1px solid #999999;
}
.searchRecommend {
  padding-left: 10px;
  border-top: 1px solid #999999;
  border-bottom: 1px solid #999999;
}
</style>