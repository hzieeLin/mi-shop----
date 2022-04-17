<template>
  <div class="container">
<!--    5种功能-->
    <div class="container-top">
     <div class="footer_service">
       <ul>
         <li><a href="">
           <em class="iconfont icon-editor2"></em>
           预约维修服务
         </a></li>
         <li><a href="">
           <em class="iconfont icon-7tianbaotui"></em>
           7天无理由退货
         </a></li>
         <li><a href="">
           <em class="iconfont icon-15tianbaotui01"></em>
           15天免费换货
         </a></li>
         <li><a href="">
           <em class="iconfont icon-gouwuchekong"></em>
           满69包邮
         </a></li>
         <li><a href="">
           <em class="iconfont icon-weizhi"></em>
           520余家售后网点
         </a></li>
       </ul>
     </div>
<!--    竖向列表-->
      <div class="footer-links">
        <dl>
          <dt>帮助中心</dt>
          <dd>账户管理</dd>
          <dd>购物指南</dd>
          <dd>订单操作</dd>
        </dl>
        <dl>
          <dt>服务支持</dt>
          <dd>售后政策</dd>
          <dd>自组服务</dd>
          <dd>相关下载</dd>
        </dl>
        <dl>
          <dt>线下门店</dt>
          <dd>小米之家</dd>
          <dd>服务网点</dd>
          <dd>授权体验店/专区</dd>
        </dl>
        <dl>
          <dt>关于小米</dt>
          <dd>了解小米</dd>
          <dd>加入小米</dd>
          <dd>投资者关系</dd>
          <dd>企业社会责任</dd>
          <dd>廉洁举报</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd>新浪微博</dd>
          <dd>官方微信</dd>
          <dd>联系我们</dd>
          <dd>公益基金会</dd>
        </dl>
        <dl>
          <dt>特色服务</dt>
          <dd>F 码通道</dd>
          <dd>礼物码</dd>
          <dd>防伪查询</dd>
        </dl>
        <div class="col-contact">
          <p class="tel-phone">400-100-5678</p>
          <p class="time">8:00-18:00 (仅收市话费)</p>
          <a href="#" class="btn">
            <em class="iconfont icon-24gl-headset"></em>
            人工客服
          </a>
          <p class="follow"><span>关注小米：</span><i class="iconfont icon-weibo"></i><i class="iconfont icon-weixin"></i></p>
        </div>
      </div>
    </div>
    <div class="purpose">
      <img src="https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/global/slogan2020.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.container {


}
.container-top {
  width: 1226px;
  margin: 0 auto;
}
.footer_service {
  width: 1226px;
  height: 25px;
  padding: 27px 0;
  border-bottom: 1px solid #e0e0e0;
}
ul {
  margin: 0;
}
li {
  float: left;
  list-style: none;
  width: 19.8%;
  height: 25px;
  font-size: 16px;
  line-height: 25px;
  text-align: center;
  border-right: 1px solid #e0e0e0;;
}
li:last-child {
  border-right: 0px;
}
li em {
  font-size: 24px;
}
.footer_service a {
  text-decoration: none;
  color: #333333;
}

.footer-links {
  height: 252.5px;
  width: 1226px;
  padding-top: 40px;
}
.footer-links dl {

  float: left;
}
.footer-links dl dt {
  width: 160px;
  height: 17.5px;
  margin: -1px 0 26px;
  font-size: 14px;
  line-height: 1.25;
  color: #424242;
}
.footer-links dl dt:hover {
  color: #ff6700;
}
.footer-links dd {
  width: 160px;
  height: 16px;
  margin: 10px 0 0;
  font-size: 12px;
  text-align: left;
}
.footer-links dd:hover {
  color: #ff6700;
}
.col-contact {
  float: left;
  width: 252px;
  height: 111px;
}
.tel-phone {
  font-size: 22px;
  color: #ff6700;
  text-align: center;
  margin: 0 0 5px;
}
.time {
  font-size: 12px;
  color: #616161;
  margin: 0 0 5px;
  text-align: center;
}
.btn {
  text-decoration: none;
  display: block;
  width: 120px;
  height: 30px;
  border: 1px solid #ff6700;
  font-size: 14px;
  line-height: 30px;
  margin: 5px auto;
  text-align: center;
  color: #ff6700;
  cursor: pointer;
}
.btn:hover {
  background-color: #ff6700;
  color: #ffffff;
}
.follow {
  font-size: 12px;
  color: #616161;
  text-align: center;
  margin: 10px 0 0;
}
.follow i {
  width: 24px;
  height: 24px;
  font-size: 20px;
  padding: 0 3px;
}
.purpose {
  width: 100%;
  height: 300px;
  background-color: #FAFAFA;
  position: relative;
}
.purpose img {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>