import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/fonts/iconfont.css'
import './assets/fonts/MyFont/iconfont.css'
import './assets/fonts/MyFontColor/iconfont.css'
import './plugins/element.js'
import './assets/css/golbal.css'
import store from "@/store/store.js";
Vue.config.productionTip = false
import axios from 'axios'

// 设置请求的根路径
axios.defaults.baseURL= 'http://127.0.0.1:3007'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// Vue.prototype.$store = store;
// 挂载axios 到Vue的原型prototype的$http
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
