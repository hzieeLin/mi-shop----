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
        <el-menu
            background-color="#fff"
            default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">用户协议</el-menu-item>
          <el-menu-item index="2">隐私政策</el-menu-item>
          <el-menu-item index="3" >帮助中心</el-menu-item>
          <el-menu-item index="4"> | </el-menu-item>
          <el-submenu index="5">
            <template slot="title">中文(简体)</template>
            <el-menu-item index="5-1">中文(繁体)</el-menu-item>
            <el-menu-item index="5-2">English</el-menu-item>
          </el-submenu>
        </el-menu>
        </nav>

        <div class="login_form">
          <div class="login_button">
            <button class="btn_login" @click="showPage(1)">登录</button>
            <button class="btn_reg" @click="showPage(2)">注册</button>
          </div>

          <el-form  ref="regFormRef" :model="regForm"  class="reg_form" v-show="displayReg" @close="regFormClose">
            <el-form-item prop="username" prefix-icon="el-icon-user-solid"  >
              <el-input type="text" v-model="regForm.username" placeholder="邮箱/手机号码/小米ID" ></el-input>
            </el-form-item>
            <el-form-item prop="password" prefix-icon="el-icon-user-solid"  >
              <el-input type="password" v-model="regForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reg">注册</el-button>
              <el-button @click="regFormClose">重置</el-button>
            </el-form-item>
          </el-form>

        <el-form  ref="loginFormRef" :model="loginForm"  class="form" @close="loginFormClose" v-show="displayLogin">
          <el-form-item prop="username" prefix-icon="el-icon-user-solid"  >
            <el-input type="text" v-model="loginForm.username" placeholder="邮箱/手机号码/小米ID"></el-input>
          </el-form-item>
          <el-form-item prop="password" prefix-icon="el-icon-user-solid" >
            <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="loginFormClose">重置</el-button>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
const util = require('util')
export default {
  data() {
    return {
      displayLogin:true,
      displayReg:false,
      regForm:{
        username: 'admin4',
        password: 'admin4'
      },
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    showPage(id) {
      if(id === 1) {
        this.displayLogin = true
        this.displayReg = false
      }
      else if (id === 2) {
        this.displayLogin = false
        this.displayReg = true
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
        if(!valid) return
        const {data: res } = await this.$http.post("/api/login",`username=${this.loginForm.username}&password=${this.loginForm.password}`)
        if (res.status === 0) {
          this.$message.success("登录成功！！！！")
          window.sessionStorage.setItem('token',res.token);
          this.$router.push({path: "/home"});
        }else {
          this.$message.error("登录失败！！！");
        }
      })

    },
    loginFormClose() {
      this.$refs.loginFormRef.resetFields();
    },
    regFormClose() {
      this.$refs.regFormRef.resetFields();
    }
  }
}
</script>

<style lang="less"  scoped>
.login_contain {
  height: 700px;
}
.login_left {
  width: 20%;
  float: left;
    img {
      width: 100%;
    }
}
.login_right {
  width: 80%;
  height: 100%;
  float: left;
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
    position: relative;
    left: 60%;
  }


}
.login_button {
  width: 360px;
  height: 41px;
}
.btn_login,.btn_reg {
  font-size: 18px;
  height: 41px;
  font-weight: 500;
  background-color: #ffffff;
  padding: 7px;
  border: 0px;
}
.btn_login {
  position: relative;
  left: -110px;
}
.btn_reg {
  position: relative;
  left: -90px;
}
.login_form {
  width: 450px;
  height: 640px;
  background-color: #f4f4f5;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .form ,.reg_form{
    width: 360px;
    height: 414px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    input {
      width: 354px;
      height: 60px;
    }
  }
}


</style>
