<template>
<div >
  <div id="tool-bar">
    <div  class="item"  @mouseenter="showImg(0)" @mouseleave="iconDisplay = false">
      <div class="icon" >
        <img :src="iconDisplay === 0 ? 'https://i8.mifile.cn/b2c-mimall-media/74c4fcb4475af8308e9a670db9c01fdf.png':'https://i8.mifile.cn/b2c-mimall-media/98a23aae70f25798192693f21c4d4039.png'" alt="">
      </div>
      <p class="text">手机APP</p>
    </div>
    <div  class="item" @mouseenter="showImg(1)" @mouseleave="iconDisplay = false">
      <div class="icon"   >
        <img :src="iconDisplay === 1 ? 'https://i8.mifile.cn/b2c-mimall-media/41f858550f42eb1770b97faf219ae215.png':'https://i8.mifile.cn/b2c-mimall-media/55cad219421bee03a801775e7309b920.png'" alt="">
      </div>
      <p class="text">个人中心</p>
    </div>
    <div  class="item" @mouseenter="showImg(2)" @mouseleave="iconDisplay = false">
      <div class="icon"  >
        <img :src="iconDisplay === 2 ? 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/95fbf0081a06eec7be4d35e277faeca0.png':'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/12eb0965ab33dc8e05870911b90f3f13.png'" alt="">
      </div>
      <p class="text">售后服务</p>
    </div>
    <div  class="item" @mouseenter="showImg(3)" @mouseleave="iconDisplay = false">
      <div class="icon"  >
        <img :src="iconDisplay === 3 ? 'https://i8.mifile.cn/b2c-mimall-media/5e9f2b1b0da09ac3b3961378284ef2d4.png':'https://i8.mifile.cn/b2c-mimall-media/4f036ae4d45002b2a6fb6756cedebf02.png'" alt="">
      </div>
      <p class="text">人工服务</p>
    </div>
    <div  class="item" @mouseenter="showImg(4)" @mouseleave="iconDisplay = false">
        <div class="icon-cart"  >
          <img :src="iconDisplay === 4 ? 'https://i8.mifile.cn/b2c-mimall-media/692a6c3b0a93a24f74a29c0f9d68ec71.png':'https://i8.mifile.cn/b2c-mimall-media/d7db56d1d850113f016c95e289e36efa.png'" alt="">
          <i>{{total}}</i>
        </div>
        <p class="text">购物车</p>

    </div>
    <div  class="item" @mouseenter="showImg(5)" @mouseleave="iconDisplay = false">
      <div class="icon">
        <img :src="iconDisplay === 5 ? '//i1.mifile.cn/f/i/2018/home/totop_hover.png':'//i1.mifile.cn/f/i/2018/home/totop.png'" alt="">
      </div>
      <p class="text">回顶部</p>
    </div>

  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      temp: 0,
      toolbarlist:[],
      items:[],
      iconDisplay: false
    }
  },
  created() {
  },
  methods: {
    showImg(i) {
     this.iconDisplay = i
    },
  },
  mounted() {
  },
  computed: {
    ...mapGetters('m_cart',['total'])
  }
  }
</script>

<style lang="less" scoped>
#tool-bar {
  position: fixed;
  top: 0px;
  right: 0;
}
.item {
  width: 84px;
  height: 92px;
  margin-top: -1px;
  border: 1px solid #f5f5f5;
  background-color: #ffffff;
  z-index: 99;
}
.noshowTop {
  display: none;
}
.showTop {
  margin-top: 14px;
  display: block;
}
.icon {
  width: 30px;
  height: 30px;
  padding-top: 18px;
  margin: 0px auto 8px;
}
.icon-cart {
  position: relative;
  width: 30px;
  height: 30px;
  padding-top: 18px;
  margin: 0px auto 8px;
}

.icon-cart i {
  position: absolute;
  top: 35% ;
  left: 65%;
  background-color: #ff6700;
  font-size: 13px;
  color: #ffffff;
  text-align: center;
  line-height: 15px;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  display: block;
}
.icon img,.icon-cart img  {
  width: 30px;
  height: 30px;
}
.text {
  font-size: 14px;
  color: #757575;
  text-align: center;
}
.item:hover .text {
  color: #ff6700;
}
</style>
