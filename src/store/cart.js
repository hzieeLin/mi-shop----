export default {
    namespaced: true,
    state: () => ({
        cart: JSON.parse(sessionStorage.getItem('cart') || '[]'),

    }),
    mutations: {
        addToCart(state, goods) {
            let findResult = state.cart.find(x =>x.goods_id === goods.goods_id&&x.goods_color === goods.goods_color
                &&x.goods_edition === goods.goods_edition)
            console.log(findResult);
            if(!findResult) {
                state.cart.push(goods)
            }else {
                findResult.goods_count++
                const findResultIndex= state.cart.findIndex(x =>x.goods_id === goods.goods_id&&x.goods_color === goods.goods_color&&x.goods_edition === goods.goods_edition&&x.goods_services !== goods.goods_services)
                if(findResultIndex) {
                    state.cart[findResultIndex] = goods
                }
            }

            this.commit('m_cart/saveToCartStorage')
        },
        editToCartService(state, goods) {
            state.cart = goods
            console.log(goods)
            this.commit('m_cart/saveToCartStorage')
        },
        saveToCartStorage(state) {
            sessionStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateGoodsState(state, goods) {
            const findResult = state.cart.find(x =>x.goods_id === goods.goods_id
                                                 &&x.goods_color === goods.goods_color
                                                 &&x.goods_edition === goods.goods_edition)
            findResult.goods_state = goods.goods_state
            this.commit('m_cart/saveToCartStorage')
        },
        updateGoodsCount(state, goods) {
            const findResult = state.cart.find(x =>x.goods_id === goods.goods_id
                &&x.goods_color === goods.goods_color
                &&x.goods_edition === goods.goods_edition)
            findResult.goods_count = goods.goods_count
            this.commit('m_cart/saveToCartStorage')
        },
        removeGoodsItem(state, goods){
             state.cart = state.cart.find(x => x.goods_id !== goods.goods_id)
            this.commit('m_cart/saveToCartStorage')
        },
        removeGoodsServiceItem(state, goods) {
            const findResult = state.cart.find(x =>x === goods)
            console.log(goods)
            console.log("findResult")
            console.log(findResult)
        }
    },
    getters: {
        // 累计该商品的总数量
        total(state) {
            let c = 0
            state.cart.forEach(goods => c+= goods.goods_count)
            state.cart.forEach(function (goods) {})
            return c
        },
        // 计算是不是全部选项都勾选
        FullState(state) {
            let temp = 0
            for (let i = 0; i < state.cart.length; i++) {
                if(state.cart[i].goods_state === true) {
                    temp++
                }
            }
            if(temp === state.cart.length) {
                return true
            }else {
                return false
            }
        },
        // 是否被勾选
        isCheckedState(state) {
            let temp = 0
            for (let i = 0; i < state.cart.length; i++) {
                if(state.cart[i].goods_state === true) {
                    temp = 1;
                    break;
                }
            }
            if(temp === 1) {
                return true
            }else {
                return false
            }
        },
        // 被选的数量和价格的乘积
        checkedGoodsAmount(state) {
            let goods_price = state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price +item.goods_allServices_price , 0)
            return goods_price;
        }
    }
}
