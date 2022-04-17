<template>
  <div class="goods_box">
    <!--    查看更多模块-->
    <div class="box-hd">
      <div class="title">{{sort}}</div>
      <div class="more">
        <span v-for="(item,index) in goodsTitleList" :key="index" @mouseenter="showGoodsByTitle(item.goods_item_title)">{{item.goods_item_title}}</span>
      </div>
      <div class="iconnext" v-show="list === '查看更多'">
        <i class="iconfont icon-xiangyou3fill"></i>
      </div>
    </div>
    <div class="goods_box_left_1"   v-if="temp">
      <a href="" v-for="item in urlList">
        <img :src="item.goods_url" alt="">
      </a>
    </div>
    <div class="goods_box_left_2" v-else>
      <a href="" v-for="item in urlList">
        <img :src="item.goods_url" alt="">
      </a>
    </div>
    <div class="goods_box_right">
        <div class="goods_items" v-for="(item) in goods" :key="item.goods_id">
          <a href="">
            <img :src="item.goods_url" alt="">
            <p class="goods_name">{{item.goods_name}}</p>
            <p class="goods_remarks">{{item.goods_remarks}}</p>
            <p class="goods_price">{{item.goods_price+'元起'}}</p>
          </a>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    sort: String,
    temp: {type: Boolean },
    list: String
  },
  data() {
    return{
      goods:[],
      goodsTitleList:[],
      urlList:[]
    }
  },
  mounted() {
    this.getGoodsList()
    this.getGoodsTitleList()
    this.getUrlList()
    },
  methods:{
    async getGoodsList() {
      const {data: res} = await this.$http.get(`/goods/homegoods/${this.sort}/${this.list}`)
      if(res.status !== 200) {
        return this.$message.error("获得homegoods列表失败！")
      }
      this.goods = res.data
    },
    async getGoodsTitleList() {
      const {data: res} = await this.$http.get(`/goods/homegoodstitle/${this.sort}`)
      if(res.status !== 200) {
        return this.$message.error("获得homegoods列表Title失败！")
      }
      this.goodsTitleList = res.data

      for (let i = 0; i < this.goodsTitleList.length; i++) {
        if(this.goodsTitleList[i].goods_item_title === '查看更多') {
          let more = document.getElementsByClassName('titlelist\\0')
          console.log(more)
        }
      }
    },
    async getGoodsListByTitle(title) {
      const {data: res} = await this.$http.get(`/goods/homegoods/${this.sort}/${title}`)
      if(res.status !== 200) {
        return this.$message.error("获得homegoods列表Title失败！")
      }
      this.goods = res.data
    },
    showGoodsByTitle(title) {
      this.goods = []
      this.getGoodsListByTitle(title)

    },
    async getUrlList() {
      const {data: res} = await this.$http.get(`/goods/imgurl/${this.sort}`)
      if(res.status !== 200) {
        return this.$message.error("获得图片列表失败！")
      }
      this.urlList = res.data
    },
  }
}
</script>

<style lang="less" scoped>
.box-hd {
  height: 58px;
  width: 1226px;
  position: relative;
}
.title {
  font-size: 22px;
  font-weight: 200;
  line-height: 58px;
  color: #333333;
  float: left;
}
.more {
  font-size: 16px;
  margin-top: 20px;
  padding-left: 10px;
  float: right;
}
.more span {
  margin-right: 10px;
}
.more span:hover {
  color: #ff6700;
  padding-bottom: 2px;
  border-bottom: 2px solid #ff6700;
}
.iconnext i {
  font-size: 20px;
  color: #999999;
}
.iconnext i:hover {
  color: #ff6700;
}
.iconnext {
  position: absolute;
  left: 98%;
  top: 36%;
}
.goods_items {
  width: 234px;
  height: 300px;
  background-color: #ffffff;
  margin: 0 0px 14px 14px;
  float: left;
}
.goods_items a {
  text-decoration: none;
  width: 234px;
  height: 260px;
  padding: 20px 0;
  display: block;
  transition: all .2s linear;
}
.goods_items img {
  width: 160px;
  height: 160px;
  margin: 0 37px 18px 37px;
}
.goods_items a:hover {
   margin-top: 4px;
  position: relative;
  z-index: 1;
  box-shadow: 10px 10px 12px -8px  rgba(0, 0, 0, 0.20);

}
.goods_items a p {
  margin: 0 10px 2px 10px;
}
.goods_box {
  width: 1226px;
  height: 628px;

}
.goods_box_left_1 {
  width: 234px;
  height: 614px;

  float: left;
}
.goods_box_left_1:hover {
  margin-top: -4px;
  box-shadow: 10px 10px 12px -8px  rgba(0, 0, 0, 0.20);
  transition: all .2s linear;
}
.goods_box_left_1 img {
  width: 234px;
  height: 614px;

}
.goods_box_left_2 {
  width: 234px;
  height: 614px;
  float: left;
}
.goods_box_left_2 a {
  width: 234px;
  height: 300px;
  display: block;
  margin-bottom: 14px;
}
.goods_box_left_2 img {
  width: 234px;
  height: 300px;
  margin: 0 0 12px 0;
}
.goods_box_left_2 a:hover {
  margin-top: -4px;
  box-shadow: 10px 10px 12px -8px  rgba(0, 0, 0, 0.20);
  transition: all .2s linear;
}

.goods_box_right {
  width: 992px;
  height: 614px;
  float: left;
}


.goods_name {
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  text-align: center;
}
.goods_remarks {
  font-size: 14px;
  color: #b0b0b0;
  text-align: center;
}
.goods_price {
  font-size: 14px;
  color: #ff6700;
  text-align: center;
  margin: 0 10px 14px 10px;
}
</style>