<template>
  <div>
    <li class="li_list">
      <span class="text" @mouseover="showHeader(catetitle)" @mouseout="noShowHeader">{{catetitle}}</span>
      <div v-if="catetitle != '服务' && catetitle !='社区'" v-show="displayHeader" class="catelist_down">
        <div class="catelist_center">
          <ul>
            <li v-for="(item, index) in piclist" :key="index" class="li_pic">
              <a href="">
                <img class="pic_img":src="item.pic_url" alt="">
                <p class="span_pic_name">{{item.pic_name}}</p>
                <p class="span_pic_price">{{item.pic_price+'元起'}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    catetitle: String
  },
  data() {
    return {
      pic: '',
      piclist:[],
      displayHeader: false
    }
  },
  methods: {

    showHeader(cateTitle){
      this.pic = cateTitle
      this.displayHeader = true
      this.getPicList()

    },
    async getPicList(){
      const {data: res} = await this.$http.get( `/header/piclist/${this.pic}`);
      if(res.status !== 200){
        this.$message.error('获取导航栏标题失败')
      }
      console.log(res)
      this.piclist = res.data
    },
    noShowHeader() {
      this.displayHeader = false
    }
  }
}
</script>

<style lang="less" scoped>
.text&:hover {
  color: #ff6700;
}
.li_list {
  list-style-type: none;
  padding: 34px 10px;
  float: left;
  display: block;
}
.li_list span {
  font-size: 16px;
}
.catelist_down {
  width: 100%;
  height: 230px;
  position: absolute;
  top: 140px;
  border-top: 1px solid #e5e5e5;
  left: 0;
  box-shadow: 0px 7px 6px -5px rgba(0, 0, 0, 0.11);
}
.catelist_center {
  width: 1226px;
  margin: 0 auto;
  background-color: #999999;
}
.li_pic {
  width: 166px;
  height: 180px;
  list-style-type: none;
  float: left;
  padding: 35px 0 0 12px;
}
.li_pic a {
  text-decoration: none;
}
.pic_img {
  width: 172px;
  height: 110px;
  border-right: 1px solid  #e0e0e0;
}
.li_pic:last-child .pic_img {
  border-right: 0px;
}
.span_pic_name {
  margin-top: 12px;
  display: block;
  font-size: 12px;
  color: #333333;
  text-align: center;
}
.span_pic_price {
  display: block;
  font-size: 12px;
  color:  #ff6700;
  text-align: center;
}
</style>