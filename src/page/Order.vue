<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="top-bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{breadTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="inside-room">
        <div class="left-room">
          <div class="menu-box" v-for="(item, index) in leftMenu" :key="index">
            <h3 class="title">{{item.title}}</h3>
            <ul class="list" v-for="(item2, index2) in item.list" :key="index2">
              <li @click="updateBreadTitle(item2.name)">{{item2.name}}</li>
            </ul>
          </div>
        </div>
        <div class="right-room">
          <div class="right-box">
            <div class="box-hd">
              <h1 class="title">
                {{breadTitle}}
              </h1>
              <div class="more">
                <ul></ul>
                <div class="search"></div>
              </div>
            </div>
            <div class="box-bd">
              <ul class="order-list">
                <li class="order-list-item"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
export default {
  name: "Order",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      leftMenu:[
        {"title": '订单中心', list: [
            { "name": '我的订单','path': ''},
            { "name": '评价晒单','path': ''},
            { "name": '话费充值订单','path': ''},
            { "name": '以旧换新订单','path': ''},
          ]},
        {"title": '个人中心', list: [
            { "name": '我的个人中心','path': ''},
            { "name": '消费通知','path': ''},
            { "name": '购买资格','path': ''},
            { "name": '现金账号','path': ''},
            { "name": '小米礼品卡','path': ''},
            { "name": '现金券','path': ''},
            { "name": '喜欢的商品','path': ''},
            { "name": '优惠券','path': ''},
            { "name": '收获地址','path': ''},
            { "name": '红包','path': ''},
          ]},
        {"title": '售后服务', list: [
            { "name": '服务记录','path': ''},
            { "name": '申请服务','path': ''},
            { "name": '领取快递报销','path': ''},
          ]},
        {"title": '账号管理', list: [
            { "name": '个人信息','path': ''},
            { "name": '修改密码','path': ''},
            { "name": '注销服务','path': ''}
          ]}
      ],
      breadTitle: '我的订单'
    }
  },
  created() {
    console.log(this.leftMenu)
  },
  methods: {
    updateBreadTitle(name) {
      this.breadTitle = name
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
  height: 1500px;
  width: 100%;
}
.top-bread {
  height: 10px;
  width: 1226px;
  margin: 0 auto;
  padding: 20px 0;
}
.inside-room {
  width: 1226px;
  height: 1500px;
  margin: 0 auto;
}
.left-room {
  width: 234px;
  height: 916px;
  padding: 36px 0;
  background-color: #ffffff;
  float: left;
}
.menu-box {
  width: 138px;
  margin: 0 48px 12px;
}
h3 {
  width: 138px;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
  color: #333333;
}
.title {
  font-weight: 400;

  margin: 0;
}
.list {
  margin: 0;
  padding: 0;
}
.list li {
  list-style: none;
  width: 138px;
  height: 21px;
  font-size: 14px;
  color: #333333;
  padding: 6px 0;
  cursor: pointer;
}
.list li:hover {
  color: #000000;
 }
.right-room {
  width: 978px;
  height: 1000px;
  margin-left: 14px;
  background-color: #ffffff;
  float: left;
}
.right-box {
  width: 882px;
  height: 900px;
  margin: 0 48px;
  padding: 36px 0;
}
.box-hd {
  width: 100%;
  height: 124px;
}
h1 {
  font-size: 30px;
  width: 882px;
  height: 68px;
  line-height: 68px;
  color: #757575;
}
</style>