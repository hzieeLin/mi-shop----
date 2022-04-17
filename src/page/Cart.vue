<template>
  <div>
<!--    上部导航栏-->
    <div class="header">
      <div class="header_container">
        <div class="header_logo">
          <a href="">
          </a>
        </div>
        <div class="header_title">
          <h2>我的购物车</h2>
          <p>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p>
        </div>
        <div class="header_login" v-if="!userinfo[0]">
           <div class="login"><a href="">登录</a></div>
           <span class="sep">|</span>
           <div class="reg"><a href="">注册</a></div>
        </div>
        <div class="header_login" v-else>
            <div class="login"><MyTopnav :username="userinfo[0].u_name"></MyTopnav></div>
            <span class="sep">|</span>
            <div class="reg"><a href="">我的订单</a></div>
          </div>
      </div>
    </div>
<!--    核心-->
    <div class="center">
      <div class="table-center">
        <div class="cart-list-header">
          <div class="col-check"><i :class="[FullState ? 'checkAll-checked':'checkAll']" @click="isFullCheck">√</i></div>
          <div class="col-img"></div>
          <div class="col-name">商品名称</div>
          <div class="col-price">单价</div>
          <div class="col-num">数量</div>
          <div class="col-total">小计</div>
          <div class="col-action">操作</div>
        </div>
        <div class="cart-list-body" v-for="(item, index) in cart" :key="index" >
          <div class="cart-list-body-top" >
            <div class="col-check1" v-model="showBottomItems = item.goods_state"><i :class="[item.goods_state ? 'col-check1-i-checked':'col-check1-i']" @click="checkState(item,index)">√</i></div>
            <div class="col-img1"><img :src="item.goods_small_logo" alt=""></div>
            <div class="col-name1">{{item.goods_name}}  {{item.goods_edition}} {{item.goods_color}}</div>
            <div class="col-price1">{{item.goods_price}}元</div>
            <div class="col-num1"> <el-input-number v-model="item.goods_count" @change="changeGoodsCount(item)" :min="1" :max="10" label="" size="small"></el-input-number></div>
            <div class="col-total1">{{(item.goods_price*item.goods_count)}}元</div>
            <div class="col-action1"><i class="el-icon-close" @click="deleteGoodsItem(item)"></i></div>
          </div>
          <div   v-show="showBottomItems" >
            <div class="cart-list-body-bottom"  v-for="(item3, index3) in cart[index].goods_services" v-show="item3.checked === true">
              <div class="col-img2"><img :src="item3.icon" alt=""></div>
              <div class="col-name2"><span>{{item3.title}}</span> <span> {{item3.describe}}</span></div>
              <div class="col-price1">{{item3.price}}元</div>
              <div class="col-num2">1</div>
              <div class="col-total1">{{item3.price}}元</div>
              <div class="col-action1"><i class="el-icon-close" @click="deleteGoodsServiceItem(item3,index)"></i></div>
            </div>
            <div class="cart-list-body-service-item" v-for="(item3, index3) in cart[index].goods_services" v-show="item3.checked === false" :key="index3">
              <i  class="iconfont icon-jiahao-copy" @click="addToCartServiceItem(item3,index,index3)"></i> <span style="color: black">{{item3.title}}</span> <span>({{item3.save}})</span> <span>{{'了解'+item3.title}} ></span>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-footer">
        <div class="section-left">
          <a href="/#/home">继续购物</a>
          <span>已选择 <i>{{total}}</i> 件</span>
        </div>
        <div class="section-right">
          <div class="total-price">
            <span>合计:</span>&ensp;&ensp;<em>{{ checkedGoodsAmount +servicePrice}}</em><span>&ensp;元</span>
          </div>
          <el-tooltip  placement="top" effect="light" :disabled="disabled">
            <div slot="content">请勾选需要结算的商品</div>
            <a class="btn-a" v-if="!this.isCheckedState">去结算</a>
            <a href="/#/cart" class="btn-b" v-else>去结算</a>
          </el-tooltip>

        </div>
      </div>
    </div>
    <Footer></Footer>
    <el-dialog
        title="title"
        :visible.sync="addDialogVisible"
        width="40%"
        center>
      <div class="dialog-div">
        <div class="dialog-div-left">
          <img :src="dialogList.icon" alt="">
        </div>
        <div class="dialog-div-right">
          <p class="name">{{dialogList.title}}</p>
          <p class="desc"><span>{{dialogList.describe}}</span><span>{{dialogList.price+'元'}}</span></p>
          <p class="agreement">
            <input type="checkBox" v-model="confirm" @click="confirmClick">我以阅读 &nbsp;&nbsp; <span>服务条款</span> |   <span>常见问题</span>
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addServiceByDialog()" :disabled="!confirm" >确认购买</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import MyTopnav from "@/components/header/MyTopnav";
import Footer from "@/components/footer/Footer";
import  {mapGetters,mapState, mapMutations } from 'vuex'
export default {
  name: "Order",
  components: {
    Footer,
    MyTopnav
  },
  data() {
        return {
          disabled: false,
          checked: false,
          detailPageServiceList:[],
          showBottomItems:null,
          servicelist:[],
          servicePrice: 0,
          serviceTypeList: [],
          serviceList: [],
          //添加服务的对话框是否显示
          addDialogVisible: false,
          dialogList: [],
        //  确认购买
          confirm: false,
          editServiceItem: null,
          index1: null
          //临时变量用来记录上一次云服务的index2
        }
      },
  mounted() {
    this.isFirstChecked()
  },
  methods: {
    ...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount','removeGoodsItem','editToCartService']),
    checkState(e,i) {
      e.goods_state = !e.goods_state
      if (e.goods_state === true) {
        this.showBottomItems = true
        this.disabled = true
        this.getSumPrice()
      }else {
        this.showBottomItems = false
        this.disabled = false
        this.servicePrice = 0
      }
      this.updateGoodsState(e)
    },
    isFullCheck() {
      this.checked = !this.checked
      if(this.checked === true) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].goods_state ===false) {
            this.checkState(this.cart[i])
          }
        }
        this.disabled = false
      }else {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].goods_state ===true) {
            this.checkState(this.cart[i])
          }
        }
        this.disabled = true
      }
    },
    changeGoodsCount(e) {
      this.updateGoodsCount(e)
    },
    confirmClick() {
      this.confirm =!this.confirm
    },
    //添加小米的商品服务或者参与获得
    addToCartServiceItem(val,i1,i2) {
      this.addDialogVisible = true
      this.dialogList = val
      this.editServiceItem= val
      this.index1= i1
    },
    addServiceByDialog() {
      for (let i = 0; i <this.cart[this.index1].goods_services.length ; i++) {
        if(this.cart[this.index1].goods_services[i].checked === true &&this.cart[this.index1].goods_services[i].type === '云服务') {
          this.cart[this.index1].goods_services[i].checked = false
        }
      }
      this.editServiceItem.checked = true
      console.log(this.editServiceItem.price)
      this.cart[this.index1].goods_allServices_price += this.editServiceItem.price
      this.addDialogVisible = false
      this.editToCartService(this.cart)
    },
    deleteGoodsItem(e) {
      const goodsItem = {
        goods_id: e.goods_id
      }
      this.removeGoodsItem(goodsItem)
    },
    //删除产品的下的服务项
    deleteGoodsServiceItem(val,index) {
      for (let i = 0; i < this.cart[index].goods_services.length; i++) {
        if(this.cart[index].goods_services[i].type === val.type && this.cart[index].goods_services[i].title === val.title) {
          this.cart[index].goods_services[i].checked = false
        }
      }
      this.cart[index].goods_allServices_price -= val.price
      this.editToCartService(this.cart)
    },
    isFirstChecked() {
      for (let i = 0; i < this.cart.length; i++) {
        if(this.cart[i].goods_state === true) {
          this.disabled = true
          this.getSumPrice()
        }
      }
    },
    getSumPrice() {
      this.servicePrice = this.servicelist.reduce((total, item) => total += item.price, 0)
    },
    //获取产品的所有服务列表
    async getGoodsAllServiceList() {
      const id_list = []
      this.cart.forEach(item => id_list.push(item.goods_id))
      console.log(id_list)
      for (let i = 0; i < id_list.length; i++) {
        const {data: res} = await this.$http.get(`/goods/serviceType/${id_list[i]}}`)
        this.serviceTypeList.push(res.data)
      }
      for (let i = 0; i < id_list.length; i++) {
        let result = []
        for (let j = 0; j <this.serviceTypeList[i].length; j++) {
          const {data: res } = await this.$http.get(`/goods/service/${id_list[i]}/${this.serviceTypeList[i][j].s_type}`)
          console.log(this.serviceTypeList[i][j].s_type)
          console.log(res.data)
          result.push(res.data)
        }
        console.log(result)
        this.serviceList.push(result)
      }
      console.log(this.serviceList)
    }
  },
  computed: {
    ...mapGetters('m_cart', ['total','FullState','isCheckedState','checkedGoodsAmount']),
    ...mapState('m_cart', ['cart','service']),
    ...mapState('m_user',['userinfo'])
  }
}
</script>

<style lang="less" scoped>
.header {
  border-bottom: 2px solid #ff6700;
}
.header_container {
  width: 1226px;
  height: 100px;
  margin: 0 auto;
}
.header_logo {
  width: 93px;
  height: 48px;
  margin-top: 26px;
  float: left;
}
.header_logo a {
  position: relative;
}
.header_logo a::after {
  position: absolute;
  width: 48px;
  height: 48px;
  content: " ";
  background: url("https://s02.mifile.cn/assets/static/image/logo-mi2.png");
  background-size: 48px 48px;
}
.header_title {
  width: 491px;
  height: 48px;
  margin-top: 26px;
  float: left;
}
.header_title h2 {
  font-size: 28px;
  line-height: 48px;
  margin: 0;
  font-weight: 400;
  float: left;
}
.header_title p {
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  color: #757575;
  margin: 20px 0 0 15px;
  float: left;
}
.header_login {
  width: 230px;
  height: 42px;
  margin-top: 40px;
  float: right;
}
.header_login a {
  text-decoration: none;
  font-size: 12px;
}
.sep {
  width: 2px;
  text-align: center;
  display: block;
  color: #757575;
  float: left;
  margin-top: 10px;
  margin-left: 2px;
}
.login a,.reg a {
  color: #757575;
}
.login {
  width: 110px;
  height: 40px;
  text-align: right;
  line-height: 40px;
  color: #757575;
  float: left;
}
.reg {
  width: 110px;
  line-height: 40px;
  color: #757575;
  height: 40px;
  float: right;
}
.user-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-menu-demo {
  background-color: #ffffff;
}
.center {
  background-color: #f5f5f5;
  padding: 38px 0;
}
.table-center {
  width: 1226px;
  margin: 40px auto;
}
.cart-list-header {
  width: 1226px;
  height: 70px;
  display: flex;
  background-color: #ffffff;
}
.cart-list-header div{
  font-size: 14px;
  line-height: 70px;
}
.col-check {
  cursor: pointer;
  width: 110px;
  height: 70px;
  line-height: 70px;
}
.col-img {
  width: 120px;
  height: 70px;
}
.col-name {
  width: 380px;
  height: 70px;
  line-height: 70px;
}
.col-price {
  width: 140px;
  padding-right: 18px;
  height: 70px;
  line-height: 70px;
}
.col-num {
  width: 150px;
  height: 70px;
}
.col-total {
  width: 120px;
  padding-right: 81px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.col-total2 {
  color: #ff6700;
}
.col-action {
  width: 80px;
  height: 70px;
  line-height: 70px;
}
.col-check1 {
  width: 110px;
  height: 86px;
}
.checkAll {
  width: 20px;
  height: 20px;
  border: 1px solid #e0e0e0;
  display: inline-block;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  margin-top: 35px;
  margin-left: 20px;
}
.checkAll:hover {
  color: #000000;
  font-weight: bold;
  font-size: 18px;
}
.checkAll-checked {
  width: 20px;
  height: 20px;
  border: 1px solid #e0e0e0;
  font-weight: bold;
  display: inline-block;
  background-color: #ff6700;
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
  margin-top: 35px;
  margin-left: 20px;
}
.col-check1-i {
  width: 20px;
  height: 20px;
  border: 1px solid #e0e0e0;
  display: block;
  color: #ffffff;
  margin-top: 35px;
  margin-left: 20px;
  cursor: pointer;
}
.col-check1-i-checked {
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  width: 20px;
  height: 20px;
  border: 1px solid #e0e0e0;
  display: block;
  background-color: #ff6700;
  color: #ffffff;
  margin-top: 35px;
  margin-left: 20px;
  cursor: pointer;
}
.col-check1-i:hover {
  font-weight: bold;
  color: #000000;
}
.col-img1 {
  position: relative;
  width: 120px;
  height: 86px;
}
.col-img1 img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 80px;
  height: 86px;
}
.col-img2 {
  position: relative;
  width: 120px;
  height: 86px;
}
.col-img2 img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 60px;
  height: 60px;
}
.col-name1 {
  width: 380px;
  height: 86px;
  line-height: 86px;
}
.col-name2 {
  width: 380px;
  height: 86px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.col-price1 {
  width: 140px;
  height: 86px;
  line-height: 86px;
}
.col-num1 {
  width: 140px;
  height: 67px;
  padding-top: 29px;
  padding-left: 10px;
}
.col-num2 {
  width: 150px;
  height: 67px;
  line-height: 67px;
  text-align: center;
}
.col-total1 {
  width: 120px;
  padding-right: 81px;
  height: 86px;
  line-height: 86px;
  text-align: right;
  color: #ff6700;
}
.col-action1 {
  text-align: center;
  width: 80px;
  height: 86px;
  line-height: 86px;
}
.col-action1 i {
  width: 20px;
  height: 20px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  border-radius: 100%;
}
.col-action1 i:hover {
  color: #ffffff;
  background-color: #d72c2c;
}
.cart-list-body {
  width: 1226px;
  height: auto;
  margin: 0;
  background-color: #ffffff;
}
.cart-list-body-top {
  width: 1226px;
  height: 84px;
  padding: 15px 0 15px 0;
  display: flex;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
}
.cart-list-body-bottom {

  margin-left: 110px;
  width: 1076px;
  border-bottom: 2px solid #ffffff;
  padding: 15px 0 15px 0;
  display: flex;
  background-color: #f5f5f5;
}
.cart-list-body-service-item {
  margin-bottom: 10px;
  margin-left: 110px;
  margin-top: 10px;
  width: 1055px;
  height: 50px;
  line-height: 50px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding-left: 20px;
}
.cart-list-body-service-item i {
  width: 22px;
  height: 22px;
  font-size: 22px;
  color: #ff6700;
  margin-right: 15px;
}
.cart-list-body-service-item span{
  color: #ff6700;
  font-size: 14px;
}
.cart-footer {
  width: 1226px;
  height: 50px;
  background-color: #ffffff;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.section-left {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #757575;
}
.section-left a {
  text-decoration: none;
  color: #757575;
  margin-left: 32px;
}
.section-left span {
  margin-left: 16px;
  border-left: 1px solid #eee;
  padding-left: 16px;
}
.section-left span i {
  color: #ff6700;
}
.section-right {
  width: 400px;
  height: 50px;
  display: flex;
}
.total-price {
  width: 200px;
  height: 48px;
  line-height: 48px;
  padding-left: 13px;
  color: #ff6700;
}
.total-price em {
  font-size: 24px;
}
.btn-a {
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
  color: #B0B0B0;
  background-color: #e0e0e0;
}
.btn-b {
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
  color: #fff;
  background-color: #ff6700;
}
.dialog-div {
  width: 540px;
  height: 119px;
}
.dialog-div-left {
  width: 60px;
  height: 119px;
  float: left;
}
.dialog-div-left img {
  width: 60px;
  height: 60px;
}
.dialog-div-right {
  float: right;
  width: 440px;
  height: 119px;
}
.name {
  width: 100%;
  height: 27px;
  margin: 5px 0 0 0;
  font-size: 18px;
  color: black;
}
.desc {
  width: 100%;
  height: 21px;
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #757575;
  display: flex;
  justify-content: space-between;
}
.agreement {
  width: 100%;
  height: 26px;
  margin: 40px 0 0 0;
  font-size: 14px;
  color: black;
}
.agreement span {
  font-size: 14px;
  color: #ff6700;
}
</style>
