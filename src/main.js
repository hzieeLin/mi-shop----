import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/fonts/iconfont.css'
import './plugins/element.js'
import './assets/css/golbal.css'
Vue.config.productionTip = false
import axios from 'axios'

// 设置请求的根路径
axios.defaults.baseURL= 'http://127.0.0.1:3007'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 挂载axios 到Vue的原型prototype的$http
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
