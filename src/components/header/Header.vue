<template>
  <div>
    <div class="nav">
      <div class="topbar">
        <div class="topbar-nav">
          <a href="/home">小米商城</a><span class="sep">|</span>
          <a href="javascript:">MIUI</a><span class="sep">|</span>
          <a href="javascript:">loT</a><span class="sep">|</span>
          <a href="javascript:">云服务</a><span class="sep">|</span>
          <a href="javascript:">天星数科</a><span class="sep">|</span>
          <a href="javascript:">有品</a><span class="sep">|</span>
          <a href="javascript:">小爱开发平台</a><span class="sep">|</span>
          <a href="javascript:">企业团购</a><span class="sep">|</span>
          <a href="javascript:">资质证照</a><span class="sep">|</span>
          <a href="javascript:">协议规则</a><span class="sep">|</span>
          <a href="javascript:">下载app</a><span class="sep">|</span>
          <a href="javascript:">智能生活</a><span class="sep">|</span>
          <a href="javascript:">Select Location</a>
        </div>
        <div class="topbar-info">
         <div class="topbar-info-div" v-if="!userinfo[0]">
           <div  class="header_a_login">
             <a href="/#/login" >登录 <span class="sep">|</span></a>
           </div>
           <div  class="header_a_reg">
             <a href="/#/login">注册</a><span class="sep">|</span>
             <a href="javascript:">消息通知</a><span class="sep"></span>
           </div>
         </div>
          <div v-else>
              <div class="header_a_login">
                <MyTopnav :username="userinfo[0] !== null ? userinfo[0].u_name: ''" text-color="#b0b0b0"></MyTopnav>
              </div>
            <div  class="header_a_reg">
              <a href="javascript:">消息通知</a><span class="sep">|</span>
              <a href="/#/orderList">我的订单</a><span class="sep"></span>
            </div>
          </div>
        </div>
        <div class="topbar-cart">
          <a href="/#/cart"><i class="iconfont icon-gouwuchekong"></i>
            购物车</a>
        </div>
      </div>
    </div>
    <div class="header_nav">
      <div class="logo">
        <img src="https://s02.mifile.cn/assets/static/image/logo-mi2.png" alt="">
      </div>
      <ul class="header_title" >
        <Topnav catetitle="Xiaomi手机" ></Topnav>
        <Topnav catetitle="Redmi红米" ></Topnav>
        <Topnav catetitle="电视" ></Topnav>
        <Topnav catetitle="笔记本"></Topnav>
        <Topnav catetitle="平板" ></Topnav>
        <Topnav catetitle="家电" ></Topnav>
        <Topnav catetitle="路由器" ></Topnav>
        <Topnav catetitle="服务"></Topnav>
        <Topnav catetitle="社区"></Topnav>
      </ul>
      <div class="div_select">
          <form action="">
            <input type="text"
                   id="input_text"
                   class="input_solid"
                   @focus="changeSelect"
                   @blur="disChangeSelect"
            >
            <div id="div_select_logo" class="border-all-solid_grey">
              <i class="iconfont icon-chaxun"></i>
            </div>
          </form>
        <ul id="select_item" >
          <li><a href="">全部商品</a></li>
          <li><a href="">电视</a></li>
          <li><a href="">红米</a></li>
          <li><a href="">洗衣机</a></li>
          <li><a href="">小米平板5</a></li>
          <li><a href="">冰箱</a></li>
          <li><a href="">小米手机</a></li>
          <li><a href="">空调</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Topnav from "@/components/header/Topnav";
import MyTopnav from "@/components/header/MyTopnav";
export default {
  data() {
    return {
      temp: '',
    }
  },
  components: {
    Topnav,
    MyTopnav
  },
  methods: {
    changeSelect() {
      let select_item = document.getElementById('select_item');
      select_item.style.display = "block";
      select_item.classList.add("select_item_border");
      let input_text = document.getElementById('input_text');
      input_text.classList.add("input-solid2");
      input_text.classList.remove("input_solid");
      let select_logo = document.getElementById("div_select_logo");
      select_logo.classList.add("border-all-solid");
      select_logo.classList.remove("border-all-solid_grey");
    },
    disChangeSelect() {
      let select_item = document.getElementById('select_item');
      select_item.style.display = "none";
      let input_text = document.getElementById('input_text');
      input_text.classList.add("input_solid")
      input_text.classList.remove("input-solid2");
      let select_logo = document.getElementById("div_select_logo");
      select_logo.classList.add("border-all-solid_grey");
      select_logo.classList.remove("border-all-solid");

    }
  },
  computed: {
    ...mapState('m_user', ['userinfo'])
  }
}
</script>

<style lang="less" scoped>
.nav {
  background-color: #333;
  height: 40px;
}
.topbar {
  position: relative;
  height: 40px;
  width: 1226px;
  margin: 0 auto;
}
.nav a {
  font-size: 12px;
  color: #b0b0b0;
  line-height: 40px;
  margin:auto 2px;
  text-decoration: none;
}
.topbar-nav {
  float: left;
}
.topbar-info {
  position: absolute;
  left: 70%;
  top: 0;
  width: 250px;
  height: 40px;
}
.topbar-info-div {
  width: 250px;
  height: 40px;
}
.topbar-cart {
  float: right;
}
span {
  color: #424242;
  margin: 0 0.3em;
}
.header_a_login {
 width: 110px;
  float: left;
}
.header_a_login a {
  display: block;
  float: right;
}
.header_a_reg {
  float: left;
}
.header_nav {
  margin: 0 auto;
  height: 100px;
  width: 1226px;
}
.logo {
  height: 100%;
  background-color: #ffffff;
  width: 230px;
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
  padding-top: 15px;
  box-sizing: border-box;
}
.div_select {
  display: inline;
  position: relative;
  height: 100px;
  width: 366px;
  float: left;
}
 form {
   width: 298px;
   height: 50px;
   margin-top: 25px;
   float: right;
 }
 #input_text {
   width: 238px;
   height: 48px;
   outline: none;
   float: left;
 }
 .input_solid {
   border-left: 1px solid #b0b0b0;
   border-top: 1px solid #b0b0b0;
   border-bottom: 1px solid #b0b0b0;
   border-right: 0px;
 }
 .div_select ul {
   background-color: #ffffff;
   margin: 0;
   position: absolute;
   left: 18.6%;
   top: 76%;
   padding: 0;
   z-index: 10;
   width: 242px;
   display: none;
 }
 .div_select li {
   list-style: none;
   padding-top: 5px;
   padding-bottom: 5px;
   padding-left: 10px;
 }
 .div_select li:hover {
   background-color:  #f5f5f5;
 }
 .input-solid2 {
   border-bottom: 1px solid #ff6700;
   border-left: 1px solid #ff6700;
   border-top: 1px solid #ff6700;
   border-right: 0px;
 }
 .border-all-solid {
   border: 1px solid #ff6700;
 }
 .border-all-solid_grey {
   border: 1px solid #b0b0b0;
 }
#div_select_logo {
   width: 50px;
   height: 50px;
   position: relative;
   float: left;
 }
#div_select_logo i{
   display: block;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-size: 18px;
 }
#div_select_logo:hover {
  background-color: #ff6700;
}
//下拉的菜单border
.select_item_border {
  border: 1px solid #ff6700;
}
#select_item {
  cursor: pointer;
}
#select_item li a {
  text-decoration: none;
}
</style>