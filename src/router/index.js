import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/page/Login.vue'
import Home from '@/page/Home.vue'
import Detail from "@/page/Detail";
import Cart from "@/page/Cart";
import Test from "@/page/Test";
import Order from "@/page/Order";
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home},
  { path: '/buy/detail', component: Detail},
  { path: '/cart', component: Cart},
  { path: '/orderList', component: Order},
  { path: '/test', component: Test}
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next)=> {
  if(to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router
