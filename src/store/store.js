import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart'
import moduleUser from '@/store/user'
import moduleService from '@/store/service'
Vue.use(Vuex)
//导入cart.js
const store = new Vuex.Store({
    modules: {
        'm_cart': moduleCart,
        'm_user': moduleUser,
        'm_service': moduleService
    }
})
export default store
