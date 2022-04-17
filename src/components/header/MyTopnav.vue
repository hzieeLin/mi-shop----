<template>
  <div >
    <div href="" class="div-name" @mouseenter="displayList = true">
      <span  @mouseleave="displayList = false" :style="{'color': textColor}">{{username}}</span>
      <i class="iconfont icon-xiangxia"></i>
      <div class="list" v-show="displayList" @mouseenter="displayList = true" @mouseleave="displayList = false">
        <div>个人中心</div>
        <div>评价晒单</div>
        <div>我的喜欢</div>
        <div>小米账号</div>
        <div @click="quit">退出登录</div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";

export default {
  props: {
    username: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#757575'
    }
  },
  name: "MyTopnav",
  data() {
    return {
      displayList: false
    }
  },
  methods: {
    ...mapMutations('m_user',['cleanUserInfoStorage']),
    quit() {
       this.cleanUserInfoStorage(this.userinfo)
    }
  },
  computed: {
    ...mapState('m_user',['userinfo'])
  }
}
</script>

<style lang="less" scoped>
.div-name {
  position: relative;
  line-height: 40px;
  display: block;
  text-decoration: none;
  font-size: 12px;
  color: #757575;
  height: 40px;
  width: 110px;
}
.div-name span {
  position: absolute;
  top: 0;
  left: 45%;
}
.div-name i {
  position: absolute;
  font-size: 12px;
  top: -6%;
  left: 80%;
  color: #757575;
}
.div-name span:hover{
  color: #ff6700;
}
.list {
  position: absolute;
  background-color: #ffffff;
  top: 100%;
  left: -1%;
  width: 110px;
  height: 150px;
  text-align: center;
  z-index: 10;
}
.list div {
  height: 30px;
  line-height: 30px;
}
.list div:hover {
  color: #ff6700;
  background-color: #f5f5f5;
}
</style>
