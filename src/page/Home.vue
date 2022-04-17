<template>
<div>
  <Header :username="username"></Header>
  <a class="home_container"  @mouseleave="noShowRightList">
    <div class="home_container_left">
      <ul>
        <li v-for="(item,index) in category" :key="index" @mouseenter="showRightList(item)">
          <a class="category_item" href="#" >{{ item }}</a>
        </li>
        <div class="category_items"  v-show="displayCategory" >
          <el-row >
            <el-col v-for="(item, index) in categorylist" :key="index" class="li_category" :span="6" id="el_col_list">
              <router-link  :to="{path: `/buy/detail`, query: {product_id: item.product_id}}" id="el_col_a">
                <img class="pic_img":src="item.category_url" alt="">
                <span class="span_pic_name">{{item.category_name}}</span>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </ul>
    </div>
    <div class="home_container_right" @mouseenter="clearGo" @mouseleave="go">
<!--      左右按钮-->
      <div class="button_prev" @click="prevImg"></div>
      <div class="button_next" @click="nextImg"></div>
      <!--    小圆点-->
      <ol class="circle">
        <li v-for="(v,i) in slideList" :key="i"  :class="temp == i ? 'current' : 'circle_item'" @click="liClick(i)"></li>
      </ol>
    </div>
<!--    核心的图片滚动区域-->
    <ul class="ul_img">
      <li>
        <a href="" >
          <img v-for="(item, index) in slideList" :key="index" v-show="temp == index" :src="item">
        </a>
      </li>
    </ul>

  </a>
  <div class="home_sub">
    <div class="home_sub_1">
      <ul>
        <li>
          <a href="#" >
            <img src="" alt="" class="iconfont icon-shijian">
            <span>保障服务</span>
          </a>
        </li>
        <li></li>
        <li>
          <a href="" >
            <img src="" alt="" class="iconfont icon-gfjianzhuwu">
            <span>企业团购</span>
          </a>
        </li>
        <li></li>
        <li>
          <a href="" >
            <img src="" alt="" class="iconfont icon-fma">
            <span>F码通道</span>
          </a>
        </li>
        <li></li>
        <li>
          <a href="" >
            <img src="" alt="" class="iconfont icon-dianhuaqia">
            <span>米粉卡</span>
          </a>
        </li>
        <li></li>
        <li>
          <a href="" >
            <img src="" alt="" class="iconfont icon-yijiuhuanxin">
            <span>以旧换新</span>
          </a>
        </li>
        <li></li>
        <li>
          <a href="">
            <img src="" alt="" class="iconfont icon-qixian1">
            <span>话费充值</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="home_sub_2">
      <a href="">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d8a6d6d37904e22c72130e3e4ec79b41.jpg?w=632&h=340" alt="">
      </a>
    </div>
    <div class="home_sub_2">
      <a href="">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bdb0b3ff4e73fe2a6bf2f8fd399015e.png?w=632&h=340" alt="">
      </a>
    </div>
    <div class="home_sub_2">
      <a href="">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b3f906861db9d6472206e6d68318d9.jpeg?w=632&h=340" alt="">
      </a>
    </div>
  </div>

  <div class="home_center">
    <div class="home-banner-box">
      <a href="">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f334fbd05d5681bb838fefd1c815d88c.jpg?thumb=1&w=1533&h=150&f=webp&q=90" alt="">
      </a>
    </div>
    <div class="home_phone">
      <GoodsList sort="手机" list="查看更多" :temp="true" ></GoodsList>

    </div>
    <div class="home_phone">
      <GoodsList sort="智能穿戴" list="热门" :temp="true" ></GoodsList>
    </div>
      <div class="home_phone">
        <GoodsList sort="家电" list="热门" :temp="false" ></GoodsList>
    </div>
    <div class="home_phone">
      <GoodsList sort="生活电器" list="扫地机" :temp="false" ></GoodsList>
    </div>
    <div class="home-banner-box">
      <a href="">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/803b5f94b371d6e5fecb2ca8995838c0.jpeg?thumb=1&w=1533&h=150&f=webp&q=90" alt="">
      </a>
    </div>
    <div class="home_phone">
      <GoodsList sort="厨房电器" list="净水器" :temp="false" ></GoodsList>
    </div>
    <div class="home_phone">
      <GoodsList sort="智能家居" list="小爱音箱" :temp="false" ></GoodsList>
    </div>
    <div class="home_phone">
      <GoodsList sort="运动出行" list="出行工具" :temp="false" ></GoodsList>
    </div>
    <div class="home-banner-box">
      <a href="">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/88e35cffc82cd98cd53172460067af17.jpg?thumb=1&w=1533&h=150&f=webp&q=90" alt="">
      </a>
    </div>
    <div class="home_phone">
      <GoodsList sort="日用百货" list="个护健康" :temp="false" ></GoodsList>
    </div>
  </div>
  <Footer></Footer>
  <Toolbar></Toolbar>
</div>
</template>
<script>
import Header from '@/components/header/Header'
import GoodsList from "@/components/home/GoodsList";
import Footer from "@/components/footer/Footer";
import Toolbar from "@/components/toolbar/Toolbar";
export default {
  components: {
    Header,
    GoodsList,
    Footer,
    Toolbar
  },
  data() {
    return{
      displayCategory:false,
      categorylist:[],
      slideList:[
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/dd741adcce9417d72ea4c1a6dfcc96e2.jpg?w=2452&h=920",
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=1533&h=575&f=webp&q=90",
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/831e0eb28e01980ebf713f867de5033f.jpg?thumb=1&w=1533&h=575&f=webp&q=90",
      ],
      temp: 0,
      interId: null,
      username:this.$route.query.username,
      category:["手机",
                "电视",
                "笔记本 平板" ,
                "家电" ,
                "出行 穿戴" ,
                "智能 路由器",
                "电源 配件" ,
                "健康 儿童",
                "耳机 音箱",
                "生活 箱包"]
    }
  },

  methods: {
    go() {
      //开始改变变量n 定时器
      this.interId = setInterval(() => {
        this.temp++;
        if(this.temp >=3){
          this.temp = 0;
        }
      }, 2000)
    },
    clearGo() {
      clearInterval(this.interId)
    },
    nextImg() {
      if(this.temp >=2) {
        this.temp = 0;
      }else{
        this.temp+=1;
      }
    },
    prevImg() {
      if(this.temp === 0){
       this.temp = 2;
      }else{
        this.temp-= 1;
      }
    },
    liClick(i) {
      console.log("i"+i)
      this.temp = i;
    },
    showRightList(item){
      this.displayCategory = true
      this.getCategoryByClass(item)
    },
    noShowRightList() {
        this.displayCategory = false
    },
    async getCategoryByClass(item) {
      const {data: res} = await this.$http.get(`/header/category/${item}`);
      if(res.status !== 200) {
        return this.$message.error("获取categorylist失败")
      }
      this.categorylist = res.data
    }
  },
  mounted() {
    this.go()
  }
}
</script>

<style lang="less" scoped>
.home_center {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
}
.home_container{
  position: relative;
  z-index: 1;
  display: block;
  width: 1226px;
  height: 460px;
  margin: 0 auto;
}
.home_container_left {
  width: 234px;
  height: 460px;
  background-color: rgba(105,101,101,.6);
  float: left;
}
.home_container_left ul {
  list-style: none;
  padding: 20px 0;
  margin: 0;
}
.home_container_left ul li{
  position: relative;
  padding-left: 30px;
  width: 204px;
  height:42px;
  line-height: 42px;
}
.home_container_left ul li::after {
  content: "";
  position: absolute;
  top: 30%;
  right: 10%;
  width: 8px;
  height: 8px;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  transform: rotate(-45deg);
}
.category_item {
  color: #ffffff;
  text-decoration: none;
}
em {
  position: relative;
  top: 12px;
  right: 20px;
  font-size: 16px;
  line-height: 16px;
  color: #e0e0e0;
  float: right;
}
//隐藏的右侧列表
.category_items {
  position: absolute;
  top: 0;
  left: 234px;
  z-index: 12;
  width: 992px;
  height: 460px;
  background-color: #ffffff;
  box-shadow: 6px 6px 12px -8px  rgba(0, 0, 0, 0.11);
}
.li_category {
  list-style: none;
}
#el_col_list{
  width: 248px;
  height: 76px;
  padding: 18px 20px;
}
#el_col_a {
  width: 225px;
  height: 40px;
  display: block;
}
#el_col_list img {
  width: 40px;
  height: 40px;
  float: left;
}
#el_col_list span {
  width: 172px;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  color: #333;
  display: block;
  float: left;
}
#el_col_list span:hover {
  color: #ff6700;
}
.home_container_left ul li:hover {
  background-color: #ff6700;
}

.home_container_right {
  position: relative;
  height: 460px;
  width: 992px;
  float: left;
}
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
li {
  list-style: none;
}
.ul_img {
  width: 1226px;
  position: absolute;
  top: -16px;
  z-index: -1;
  padding: 0;
}
.ul_img img {
  width: 1226px;
  height: 460px;
}
.circle {
  position: absolute;
  bottom: 10px;
  left: 85%;
  width: 70px;
  height: 21px;

}
.circle_item {
  background-color: #999999;
  width: 10px;
  height: 10px;
  margin: 4px;
  border-radius: 50%;
  float: left;
  border: 2px solid rgba(105,101,101,.6);
}
.circle li:hover {
  background-color: #e5e5e5;
}
.current {
  width: 10px;
  height: 10px;
  margin: 4px;
  border-radius: 50%;
  float: left;
  background-color: #ffffff;
  border: 2px solid rgba(105,101,101,.6);
}

.home_sub {
  margin: 22px auto;
  width: 1226px;
  height: 170px;
}
.home_sub_1 {
  width: 234px;
  height: 170px;
  float: left;
  background: #5f5750;
}
.home_sub ul {
  overflow: hidden;
  padding: 0;
  margin: 0;

}

.home_sub_1 li:nth-child(odd) {
  list-style: none;
  position: relative;
  width: 76px;
  height: 82px;
  float: left;
  margin: 0;
}
.home_sub_1 li:nth-child(even) {
  list-style: none;
  position: relative;
  color: #999999;
}
.home_sub_1 li a {
  text-decoration: none;
  color: #e5e5e5;
  width: 1px;
  height: 30px;
}
.home_sub_1 li img {
  display: block;
  margin: 18px 23px 4px 23px;
  color: #ffffff;
  font-size: 26px;
}
.home_sub_1 li span {
  display: block;
  margin: 0 8px;
  font-size: 14px;
  font-weight: 200;
  color: #e5e5e5;
}
.home_sub_2 {
  margin-left: 14px;
  width: 316px;
  height: 170px;
  float: left;
}
.home_sub_2 img {
  width: 315px;
  height: 170px;
}
.home-banner-box {
  width: 1226px;
  height: 120px;
  padding-top: 22px;
  margin: 0 auto;
}
.home-banner-box img {
  width: 1226px;
  height: 120px;
}
.home_phone {
  margin: 12px auto;
  height: 686px;
  width: 1226px;
}


</style>
