<template>
<div class="detail-page">
  <Header></Header>
  <div class="nav-container" v-show="displaySuccessTip">
   <div class="nav_box">
     <div class="nav_left">
       <h3>{{titleName}}</h3>
     </div>
     <div class="nav_right">
       <span>概述页</span><em>|</em>
       <span>参考页</span><em>|</em>
       <span>F码通道</span><em>|</em>
       <span>咨询客服</span><em>|</em>
       <span>用户评价</span>
     </div>
   </div>
  </div>
  <div class="detail-container" v-show="displaySuccessTip">
    <div class="product_container">
    <div class="product_left">
      <div class="slide_box" @mouseenter="cleargo" @mouseleave="go">
        <div class="button_prev" @click="previmg"></div>
        <div class="button_next" @click="nextimg"></div>
        <ul>
          <li v-for="(item, index) in slidelist" v-show="index === temp" :key="index" >
            <img :src="item.slide_url" alt="">
          </li>
        </ul>
        <div class="circle">
          <span v-for="(item, index) in slidelist" @click="clickli(index)" :class="temp ==index? 'current' : 'circle_item'" :key="index"></span>
        </div>
      </div>
    </div>
    <div class="product_right">
      <div class="remakes">
        <h2>{{titleName}}</h2>
        <div class="remakes_describe" v-for="(item,index) in details" :key="index">
          <p> <font color="#ff4a00">{{item.d_describe1}}</font>{{item.d_describe2}}</p>
        </div>
        <p class="remakes_text">小米自营 <span>{{new_price+'元'}}</span></p>

      </div>
      <div class="line"></div>
      <!--      地址区域-->
      <div class="address">
        <i class="iconfont icon-weizhi"></i>
        <div class="address_div">
          <span>{{province}}</span>
          <span>{{city}}</span>
          <span>{{district}}</span>
          <span>{{detAddr}}</span>
          <span @click="updateAddressDialogVisible1=true">修改</span>
        </div>
      </div>
      <div class="title">选择版本</div>
      <div class="edition_box">
        <div :class="['button1', i1 === active1 ? 'btnColor': '']" v-for="(item,i1) in editions" :key="i1" @click="btnColor1(i1,item.sale_edition)"  ref="editionbutton">{{item.sale_edition}}</div>
      </div>
      <div class="title">选择颜色</div>
      <div class="edition_box">
        <div :class="['button2', i2 === active2 ? 'btnColor': '']" v-for="(item,i2) in colors" :key="i2" @click="btnColor2(i2,item.color_color)" ref="colorbutton">{{item.color_color}}</div>
      </div>

      <Service :mitype="item.s_type" @serviceData="getSonService" @serviceAllDate="getAllServiceList" v-for="(item, index) in serviceTypeList" :key="index"></Service>
      <div class="total">
        <div class="total-edition">
          <span>{{titleName}} {{editon}} {{color}}</span>
          <span>{{new_price}}元</span>
        </div>
        <ul class="total-ul" v-for="(item, index) in ServiceDataBySon" :key="index" v-show="item.price> 0">
          <li><span>{{item.title}}</span><span>{{item.price+'元'}}</span></li>
        </ul>
        <div class="total-price">
          总计： {{totalPrice+servicePrice}}元
        </div>
      </div>
      <!-- 下面购物车按钮 -->
      <div class="add" @click="addCart">
        加入购物车
      </div>
      <div class="like">喜欢</div>
    </div>
  </div>
  </div>
<!--  当购买成功后的页面-->
  <div v-show="!displaySuccessTip" class="success-container">
    <div class="back-top">
      <div class="back-top-left">
        <div class="goods-img">
          <img src="https://c1.mifile.cn/f/i/17/static/success.png" alt="">
        </div>
        <div class="goods-info">
          <h3>以成功加入购物车！</h3>
          <span>Xiaomi 12 Pro</span><span>12GB+256GB</span><span>黑色</span>
        </div>
      </div>
      <div class="back-top-right">
        <div class="btn-back" @click="btnBack">返回上一级</div>
        <div class="btn-cart" @click="btnCart">去购物车结算</div>
      </div>
    </div>
    <div style="height: 42px; width: 1226px;margin: 0 auto"></div>
    <div class="goods-list">
      <h2 class="goods-list-title"><span>买购物车中商品的人还买了</span></h2>
    </div>
  </div>
  <el-dialog
      title="修改地址"
      :visible.sync="updateAddressDialogVisible1"
      close-on-press-escape
      destroy-on-close
      width="40%">
    <span>我的地址{{province+' '}}{{city+' '}}{{district+''}}</span>
    <span id="button_addr" @click="optPro">手动选择地址 ></span>
    <div>

      <div id="pro" style="display: none">
      <span>选择省份/自治区</span>
        <div class="line"></div>
        <ul class="address_ul">
          <li v-for="(item,index) in prolist" :key="index" @click="getAddrCity(index)" class="pro">{{item.pro_name}}</li>
        </ul>
        <div class="line"></div>
      </div>
      <div id="city" style="display: none">
        <span>选择城市/地区</span>
        <div class="line"></div>
        <ul class="address_ul">
          <li v-for="(item,index) in citylist" :key="index" @click="getAddrDis(index)" class="city">{{item.city_name}}</li>
        </ul>
        <div class="line"></div>
      </div>
      <div id="dis" style="display: none">
        <span>选择区县</span>
        <div class="line"></div>
        <ul class="address_ul">
          <li v-for="(item,index) in dislist" :key="index" @click="closeDialog(index)" class="dis">{{item.dis_name}}</li>
        </ul>
        <div class="line"></div>
      </div>
    </div>
  </el-dialog>
  <Footer></Footer>
</div>
</template>

<script>
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Service from "@/components/service/Service";
import { mapState,mapMutations } from 'vuex'
export default {
  data() {
    return {
      urlTitle:'',
      temp: 0,
      slideGo: null,
      product_id:this.$route.query.product_id,
      titleName: null,
      slidelist:[],
      details:[],
      editions:[],
      colors:[],
      color:'',
      editon: '',
      new_price: 0,
      totalPrice:0,
      province: '',
      city:'',
      district:'',
      /*detAddr为具体地址*/
      detAddr:'',
      addresslist:[],
      username:'',
      prolist:[],
      citylist:[],
      dislist:[],
      serviceTypeList:[],
      servicePrice: 0,
      //active1是版本选择的，active2是选择颜色
      active1: 0,
      active2: 0,
      /*
      * 修改地址*/
      updateAddressDialogVisible1:false,
      updateAddressDialogVisible2:false,
      ServiceDataBySon:[],
      serviceData: [],
    //  购买成功后的页面需求
      displaySuccessTip: true
    }
  },
 components: {
   Header,
   Service,
   Footer
 },
  created() {
    this.username = this.userinfo[0].username
    this.urlTitle = this.$route.params.title
    this.getSlideList()
    this.getDetail()
    this.getEditions()
    this.getColors()
    this.getAddress()
    this.getService()
  },
  mounted() {
    this.go()
  },
  methods: {
    ...mapMutations('m_cart',['addToCart']),
    getSonService(val) {
      console.log(val)
      for (let i = 0; i < this.serviceData.length; i++) {
        for (let j = 0; j <this.serviceData[i].length; j++) {
          if (this.serviceData[i][j].type === val.type&&this.serviceData[i][j].title === val.title) {
            this.serviceData[i][j] = val
          }
        }
      }
      console.log('------service--------')
      console.log(this.serviceData)
      console.log('------service--------')
    },
    getAllServiceList(val) {
      this.serviceData.push(val)
      console.log('-----------------')
    },
    async getService() {
      const {data: res} = await this.$http.get(`/goods/serviceType/${this.$route.query.product_id}}`)
      this.serviceTypeList = res.data
      console.log(this.serviceTypeList)
    },
    optPro() {
      let pro = document.getElementById('pro')
      pro.style.display = "block"
      let button_addr = document.getElementById('button_addr')
      button_addr.style.display="none"
      this.getAddrProvice()
    },
    async getAddrProvice(){
      const {data: res } = await this.$http.get(`/api/addr/pro`)
      this.prolist = res.data
    },
  async getAddrCity(i) {
    let pro_name = document.getElementsByClassName('pro')[i]
    let proname = pro_name.innerHTML
    this.province = proname
    const {data: res } =await this.$http.get(`/api/addr/city/${proname}`);
    this.citylist = res.data
    let pro = document.getElementById('pro')
    pro.style.display = "none"
    let city1 = document.getElementById('city')
    city1.style.display = "block"

  },
    async getAddrDis(i) {
      let city_name = document.getElementsByClassName('city')[i]
      let cityname = city_name.innerHTML
      this.city = cityname
      const {data: res} = await this.$http.get(`/api/addr/dis/${cityname}`)
      this.dislist = res.data
      let city1 = document.getElementById('city')
      city1.style.display = "none"
      let dis = document.getElementById('dis')
      dis.style.display = "block"
    },
    closeDialog(i) {
      let dis_name = document.getElementsByClassName('dis')[i]
      this.district = dis_name.innerHTML
      this.updateAddressDialogVisible1 = false
    },
    async getSlideList() {
      const {data: res } =await this.$http.get(`/goods/slidelist/${this.$route.query.product_id}`)
      this.slidelist = res.data
    },
    async getDetail() {
      const {data :res} = await this.$http.get(`/goods/detail/${this.$route.query.product_id}`);
      this.details = res.data
    },
    async getEditions() {
      const {data :res} = await this.$http.get(`/goods/editions/${this.$route.query.product_id}`);
      this.editions = res.data
      this.sale_goods_id = this.editions[0].sale_goods_id
      this.editon = this.editions[0].sale_edition
      this.titleName = this.editions[0].sale_name
      this.color = this.editions[0].color_color
      this.getPrice(this.editon, this.titleName)
    },
    async getColors() {
      const {data :res} = await this.$http.get(`/goods/colors/${this.$route.query.product_id}`);
      this.colors = res.data

    },
    async getAddress() {
      const {data: res} = await this.$http.get(`/api/address/${this.userinfo[0].username}`);
      this.addresslist = res.data
      this.province= this.addresslist[0].u_pro
      this.city=this.addresslist[0].u_city
      this.district=this.addresslist[0].u_dis
          /*detAddr为具体地址*/
      this.detAddr=this.addresslist[0].u_details
    },
    getServicePrice() {
      this.servicePrice = this.ServiceDataBySon.filter(item => item.price).reduce((sum, item) => {
        return sum += item.price
      }, 0)
    },
    /*
    * 轮播图左按钮
    * */
    previmg() {
      if(this.temp === 0) {
        this.temp = 4;
      }else {
        this.temp -=1;
      }
    },
    /*
    * 轮播图右按钮
    * */
    nextimg() {
      if(this.temp === 4) {
        this.temp = 0;
      }else {
        this.temp +=1;
      }
    },
    /*轮播图定时器
    * */
    go() {
      this.slideGo = setInterval(()=> {
        this.temp++;
        if(this.temp >= 5) {
          this.temp = 0;
        }
      },2000)
    },
    cleargo() {
      clearInterval(this.slideGo)
    },
    /*
    * 轮播图小圆点*/
    clickli(i) {
      this.temp = i;
    },
    /*
    * 按钮变换颜色*/
    btnColor1(i1, edit) {
      this.active1 = i1
      this.editon = edit
      this.getPrice(this.editon,this.titleName)
    },
       // 按钮变换颜色
    btnColor2(i2,color) {
      this.active2 = i2
      this.color = color
    },
    /*
    * 获取商品价格
    * 参数
    * 产品名称也就是标题this.titleName
    * 版本this.edition*/
    async getPrice(edition,titleName) {

      const {data: res} =await this.$http.get(`/goods/sale/${edition}/${titleName}`);
      this.new_price = res.data[0].sale_price
      this.totalPrice = res.data[0].sale_price
      console.log()
    },
    addCart() {
      let result = []
      let resultPrice = 0;
      for (let i = 0; i < this.serviceData.length; i++) {
        for (let j = 0; j < this.serviceData[i].length; j++) {
          if (this.serviceData[i][j].checked === true) {
            result.push(this.serviceData[i][j])
            resultPrice += this.serviceData[i][j].price
          }
        }
      }
      for (let i = 0; i < this.serviceData.length; i++) {
        for (let j = 0; j < this.serviceData[i].length; j++) {
          if (this.serviceData[i][j].checked !== true) {
            result.push(this.serviceData[i][j])
          }
        }
      }
      for (let i = 0; i < result.length; i++) {
        if(result[i].checked) {
          resultPrice += 0
        }
      }
      const goods = {
        goods_id: this.editions[0].sale_goods_id,
        goods_count: 1,
        goods_name: this.editions[0].sale_name,
        goods_color: this.color,
        goods_edition: this.editon,
        goods_price: this.new_price,
        goods_small_logo: this.editions[0].sale_small_logo,
        goods_state: true,
        goods_services: result,
        goods_allServices_price: resultPrice
      }
      this.addToCart(goods)
      this.displaySuccessTip = !this.displaySuccessTip
      window.scrollTo(500,0)
    },
    btnBack() {
      this.displaySuccessTip = !this.displaySuccessTip
    },
    btnCart() {
      this.$router.push({path: "/cart"})
    }
  },
  computed: {
    ...mapState('m_user',['userinfo']),
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  height: 3000px;
}
#button_addr {
  position: absolute;
  color: #B0B0B0;
  top: 30%;
  right: 5%;
  cursor: pointer;
}
.address_ul {
  padding: 10px;
  width: 600px;
  height: 300px;
  margin: 0;
}
.address_ul li {
  cursor: pointer;
  list-style: none;
  height: 22.5px;
  width: 100px;
  padding: 2px 3px;
  float: left;
}
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #e0e0e0;
}
.nav-container {
  position: relative;
  width: 100%;
  height: 60px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 15px 14px -7px #e0e0e0;
}
.nav_box {
  width: 1226px;
  margin: 0 auto;
}
.nav_left {
  width: 200px;
  height: 18px;
  float: left;
}
.nav_right {
  position: absolute;
  right: 10%;
  top: 26%;
  width: 348px;
  height: 21px;
}
.nav_right span {
  color: #616161;
  font-size: 14px;
}
.nav_right em {
  font-style: normal;
  color: #616161;
  margin: 0 7px;
}
.nav_right span:hover {
  color: #ff6700;
}
.product_container {
  width: 1226px;
  height: auto;
  display: flex;
  margin: 0 auto 50px;
  padding-top: 32px;
}
.product_left {
  width: 606px;
  height: 100%;
  float: left;
}
//轮播图
.slide_box {
  position: relative;
  width: 560px;
  height: 560px;

}
.slide_box ul {
  width: 560px;
  height: 560px;
  padding: 0;
}
.slide_box ul li {
  list-style: none;
}
.slide_box img {
  width: 560px;
  height: 560px;
}
//左右按钮
.button_prev {
  position: absolute;
  top:50%;
  margin-top: -37px;
  width: 41px;
  height: 69px;
  background: url("https://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat -84px 50%;
}
.button_prev:hover {
  background: url("https://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat;
}
.button_next {
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -37px;
  width: 41px;
  height: 69px;
  background: url("https://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat -125px 50%;
}
.button_next:hover {
  background: url("https://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat -41px 50%;
}
.circle {
  position: absolute;
  padding: 0 135px;
  bottom: 10px;
  width: 290px;
  height: 21px;
}
.circle_item{
  list-style: none;
  background-color: #CCCCCC;
  display: block;
  float: left;
  width: 50px;
  height: 3px;
  margin: 0 4px;
}
.current {
  list-style: none;
  display: block;
  float: left;
  width: 50px;
  height: 3px;
  margin: 0 4px;
  background-color: #A3A3A3;
}
.product_right {
  width: 600px;
  height: 100%;
  margin-left: 20px;
  float: left;
}
.remakes {
  width: 600px;
  height: 147px;
}
.remakes h2 {
  width: 600px;
  height: 36px;
  font-size: 24px;
  font-weight: 400;
  color: #212121;
  margin: 0;
  padding: 0;
}
.remakes_describe {
  width: 600px;
  height: 42px;
  padding-top: 8px;
}
.remakes_describe p {
  font-size: 14px;
  color: #B0B0B0;
}
.remakes_text {
  color: #ff6700;
}
.address {
  position: relative;
  width: 498px;
  height: 42px;
  padding: 30px 50px;
  margin: 12px 0;
  background-color: #FAFAFA;
  border: 1px solid #e0e0e0;
}
.address i {
  font-size: 18px;
  position: absolute;
  top: 32%;
  left: 5%;
  width: 20px;
  height: 30px;
  float: left;
}
.address_div {
  width: 420px;
  height: 21px;
}
.address_div span {
  margin-left: 4px;
  margin-right: 10px;
  font-size: 14px;
}
.address_div span:last-child {
  color: #ff6700;
  cursor: pointer;
}
.title {
  position: relative;
  height: 27px;
  width: 600px;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 15px;
}
.edition_box {
  width: 600px;
  height: 108px;
  margin-bottom: 20px;
}
.button1,.button2 {
  width: 282px;
  height: 42px;
  padding: 0 2px;
  margin: 10px 12px 0 0;
  text-align: center;
  line-height: 42px;
  border: 1px solid #e0e0e0;
  float: left;
}
.button1:hover,.button2:hover {
  color: #ff6700;
  border: 1px solid #ff6700;
}
.btnColor {
  color: #ff6700;
  border: 1px solid #ff6700;
}
.mi-service {
  width: 598px;
  height: 86px;
  padding: 30px 0;
  border: 1px solid #e0e0e0;
  margin-top: -1px;
  margin-bottom: 30px;
  background-color: #FAFAFA;
}
.total {
  width: 540px;
  padding: 30px;
  margin:30px 0;
  background-color: #F9F9FA;
}
.total-edition {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.total-ul {
  margin: 0;
  padding: 5px 0 0 0;
  width: 530px;
}
.total-ul li {
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
  width: 102%;
}
.total ul li span {
  float: right;
}
.total-price {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
.add {
  width: 298px;
  height: 52px;
  padding: 1px;
  color: #ffffff;
  line-height: 52px;
  text-align: center;
  background-color: #ff6700;
  float: left;
}
.add:hover {
  background-color: #df5000;
}
.like {
  width: 140px;
  height: 52px;
  color: #ffffff;
  line-height: 52px;
  text-align: center;
  padding: 1px;
  background-color: #B0B0B0;
  margin-left: 10px;
  float: left;
}


.success-container {
  height: 900px;
  width: 100%;
  background: #f5f5f5;
  padding: 38px 0;
}
.back-top {
  width: 1226px;
  height: 68px;
  padding-bottom: 28px;
  margin: 0 auto 26px;
  border-bottom: 1px solid #e0e0e0;
}
.back-top-left {
  width: 310px;
  height: 64px;
  float: left;
}
.goods-img {
  float: left;
  width: 64px;
  height: 64px;
}
.goods-info {
  float: right;
  width: 226px;
  height: 60px;
  margin-left: 20px;
}
.goods-info h3 {
  margin: 0;
  font-weight: 400;
  font-size: 24px;
  color: #424242;
}
.goods-info span {
  font-size: 14px;
  color: #757575;
}
.back-top-right {
  float: right;
  width: 392px;
  height: 45px;
}
.btn-back,.btn-cart {
  margin: 5px 0 0 12px;
  width: 180px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
}
.btn-back {
  float: left;
  border: 1px solid #B0B0B0;
  color: #B0B0B0;
  transition: all .4s linear;
}
.btn-back:hover {
  background: #ffffff;
  color: #333;
}
.btn-cart {
  float: right;
  background: #ec6211;
  color: #ffffff;
  transition: all .4s linear;
}
.btn-cart {
  background: #ff6700;
}
.goods-list {
  width: 1226px;
  height: 665px;
  margin: 0 auto;
}
.goods-list-title {
  position: relative;
  width: 1226px;
  height: 50px;
  border-top: 1px solid #e0e0e0;
}
.goods-list-title span {
  background: #f5f5f5;
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 30px;
  color: #757575;
  font-weight: 400;
  display: block;
  width: 482px;
  height: 40px;
  text-align: center;
}
</style>
