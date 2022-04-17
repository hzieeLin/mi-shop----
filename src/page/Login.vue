<template>
  <div>
    <div class="login_contain">
      <div class="login_left">
        <img src="https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/banner.4994397e.jpg" alt="">
      </div>
      <div class="login_right">
        <nav>
          <div class="nav_logo">
            <img src="https://s02.mifile.cn/assets/static/image/logo-mi2.png" alt="">
            <h2>小米账号</h2>
          </div>
          <ul class="ul_nav">
            <li>用户协议</li>
            <li>隐私政策</li>
            <li>帮助中心</li>
            <li>
              <select>
                <option value="">中文(繁体)</option>
                <option value="">English</option>
              </select>
            </li>
          </ul>
        </nav>

        <div class="login_form">
          <div class="box2">
          </div>
          <div class="form_button">
            <div class="btn_login" @click="showPage(1)" id="btn_login">登录</div>
            <div class="btn_reg"  @click="showPage(2)" id="btn_reg">注册</div>

          </div>
          <div class="form_container">
            <el-collapse-transition>
            <div class="reg_div_form" v-show="displayReg">
              <el-form  ref="regFormRef" :model="loginForm"  @close="regFormClose">
                <div class="login_form_input">
                  <el-form-item prop="username">
                    <input type="text" v-model="regForm.username" @click="inputuser">
<!--                    <label id="label_user" class="label_no_click">邮箱/手机号码/小米ID</label>-->
                  </el-form-item>
                </div>
                <div class="login_form_input">
                  <el-form-item prop="password" >
                    <input type="text" v-model="regForm.password" @click="inputpwd">
<!--                    <label id="label_pwd" class="label_no_click">密码</label>-->
                  </el-form-item>
                </div>
                <el-form-item>
                  <input type="checkbox" class="checkbox"></input>
                  <span class="span_text">已阅读并同意小米账号 <span>用户协议</span> 和 <span>隐私协议</span>
                    </span>
                  <el-button  class="btn_login_click" @click="login">注册</el-button>
                </el-form-item>
              </el-form>
            </div>
            </el-collapse-transition>
            <el-collapse-transition>
              <div class="login_div_form" v-show="displayLogin">
                <el-form  ref="loginFormRef" :model="loginForm"  @close="regFormClose">
                  <div class="login_form_input">
                    <el-form-item prop="username">
                      <input type="text" v-model="loginForm.username" @click="inputuser">
                      <label id="label_user" class="label_no_click">邮箱/手机号码/小米ID</label>
                    </el-form-item>
                  </div>
                  <div class="login_form_input">
                  <el-form-item prop="password" >
                    <input type="text" v-model="loginForm.password" @click="inputpwd">
                    <label id="label_pwd" class="label_no_click">密码</label>
                  </el-form-item>
                  </div>
                  <el-form-item>
                    <input type="checkbox" class="checkbox"></input>
                    <span class="span_text">已阅读并同意小米账号 <span>用户协议</span> 和 <span>隐私协议</span>
                    </span>
                    <el-button  class="btn_login_click" @click="login">登录</el-button>
                  </el-form-item>

                </el-form>
                <div class="div_forget">
                  <span>忘记密码？</span>
                </div>
                <div class="div_phone">
                  <span>手机号登录</span>
                </div>
              </div>
            </el-collapse-transition>
          </div>
          <div class="form_logo">
            <div class="other_login">
              其他方式登录
            </div>
            <div class="other_logo">
              <ul>
                <li class="iconfont icon-zhifubao"></li>
                <li class="iconfont icon-weixin"></li>
                <li class="iconfont icon-QQ1"></li>
                <li class="iconfont icon-weibo"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data() {
    return {
      displayLogin:true,
      displayReg:false,
      regForm:{
        username: '',
        password: ''
      },
      loginForm: {
        username: 'admin1',
        password: 'admin1'
      }
    }
  },
  methods: {
    ...mapMutations('m_user',['addToUserInfo','cleanUserInfoStorage']),
    showPage(id) {
      if(id === 1) {
        this.displayLogin = true
        this.displayReg = false
        let btn_login = document.getElementById('btn_login');
        btn_login.classList.add('btn_click')
        let btn_reg = document.getElementById('btn_reg');
        btn_reg.classList.remove('btn_click')
      }
      else if (id === 2) {
        this.displayLogin = false
        this.displayReg = true
        let btn_login = document.getElementById('btn_login');
        btn_login.classList.remove('btn_click')
        let btn_reg = document.getElementById('btn_reg');
        btn_reg.classList.add('btn_click')
      }
    },
    reg() {
      this.$refs.regFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post("/api/reguser", this.regForm)
        console.log(res.status)
        if (res.status === 200) {
          this.$message.success("注册成功！！！");
          this.showPage(1)
        } else {
          this.$message.error("注册失败！！！");
        }
      });
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post("/api/login", this.loginForm)
        console.log(res.status)
        if (res.status === 200) {
          window.sessionStorage.setItem('token', res.token)
          this.$router.push({path: "/home"})
          const {data: res1} = await this.$http.get(`/api/login/userinfo/${this.loginForm.username}`)
          this.addToUserInfo(res1.data[0])
          this.cleanUserInfoStorage(res1.data[0])
        } else {
          this.$message.error("登录失败！！！");
        }
      })
    },
    regFormClose() {
      this.$refs.regFormRef.resetFields();
    },
    loginFormClose() {
      this.$refs.loginFormRef.resetFields();
    },
    inputuser() {
      let label_user = document.getElementById('label_user')
      label_user.classList.remove('label_no_click')
      label_user.classList.add('label_click')
    },
    inputpwd() {
      let label_pwd = document.getElementById('label_pwd')
      label_pwd.classList.remove('label_no_click')
      label_pwd.classList.add('label_click')
    }
  }
}
</script>

<style lang="less"  scoped>
.login_contain {
  height: 700px;
}
.login_left {
  width: 25%;
  float: left;

}
.login_left img {
  width: 100%;
}
.login_right {
  width: 75%;
  height: 100%;
  float: left;
  background-color: #fdfdfd;
}
nav {
  height: 30px;
  .nav_logo {
    h2 {
      float: left;
      margin-top: 10px;
      font-weight: normal;
    }
    img {
      width: 40px;
      height: 40px;
      margin: 10px;
      float: left;
    }
  }
  .el-menu-demo {
    float: left;
    position: absolute;
    left: 70%;
  }

}
.ul_nav {

}
.ul_nav li {
  list-style: none;
  display: inline;
}
.form_button {

  width: 360px;
  height: 41px;
  margin-bottom: 4px;
}
.btn_login,.btn_reg {
  cursor: pointer;//鼠标悬停的手型指标
  font-size: 20px;
  width: 44px;
  height: 41px;
  color: #bbbbbb;
  font-weight: 500;
  line-height: 41px;
  background-color: #ffffff;
  float: left;
}
.box2 {
  position: absolute;
  top:0%;
  right: 0;
  width: 0px;
  height: 0px;
  border-top: 60px solid pink;
  border-left: 60px solid transparent;
  border-bottom: 50px solid transparent;
  border-right: 0px solid green;
}
.btn_login {

}
.btn_reg {
  margin-left: 20px;
}
.btn_click {
  color: #333;
  border-bottom: 4px solid #ff5c00;
}
//中间的form核心区域
.form_container {
  position: relative;
  width: 360px;
  height: 330.8px;
}
.reg_div_form {
  width: 360px;
  height: 330.8px;
}
.login_div_form {
  width: 360px;
  height: 330.8px;
}
.login_form {
  position: relative;
  width: 360px;
  height: 476px;
  padding: 40px 45px;
  background-color: #ffffff;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

}
.form{
  width: 360px;
  height: 330.8px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

}
.login_form_input {
  margin-top: 20px;
  position: relative;
  width: 354px;
  height: 60px;
  background-color:  #f4f4f5;
}
.login_form_input input {
  width: 314px;
  height: 20px;
  padding: 30px 20px 10px 20px;
  background-color:  #f4f4f5;
  border: 0px;
}
//复选框
.checkbox {
  width: 20px;
  height: 20px;
  float: left;
  margin-top: 12px;

}
//选中后的颜色
.checkbox:checked:after {
  background-color: #ff5c00;
}
.span_text {
  color: #acacac;
  display: block;
  float: left;
  line-height: 25px;
  margin-top: 10px;
}
.span_text span {
  color: #333;
}
.btn_login_click {
  width: 354px;
  height: 60px;
  background-color: #ffbe99;
  font-size: 20px;
  color: #ffffff;
  margin-top: 10px;
}
.label_no_click {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(0, -50%);
  color: rgba(0,0,0,.4);
}
#text_input{
  display: flex;
  justify-content: flex-end;
}

.label_click {
  position: absolute;
  top: 10%;
  left: 5%;
  font-size: 12px;
  color: rgba(0,0,0,.4);
}
.div_forget {
  float: left;
}
.div_phone {
  float: right;
}
.div_forget, .div_phone span {
  color: #ff5c00;
}
.form_logo {
  width: 360px;
  height: 96px;
}
.other_login {
  width: 360px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.other_logo {
  width: 360px;
  height: 51px;
}
.other_logo ul {
  padding: 0;
  margin: 10px auto;
  width: 300px;
  height: 40px;
}
.other_logo li {
  list-style: none;
  display: inline;
  font-size: 40px;
  padding-right: 40px;
}

</style>
