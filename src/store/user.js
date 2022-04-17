export default {
    namespaced: true,
    state: () => ({
        userinfo: JSON.parse(sessionStorage.getItem('userinfo') || '[]')
    }),
    mutations: {
        addToUserInfo(state, user) {
            const findResult = state.userinfo.find(x => x.uid === user.uid)
            if (!findResult) {
                state.userinfo.push(user)
            }
            this.commit('m_user/saveToUserInfoStorage')
        },
        saveToUserInfoStorage(state) {
            sessionStorage.setItem('userinfo', JSON.stringify(state.userinfo))
        },
        cleanUserInfoStorage(state,user) {
            state.userinfo = state.userinfo.filter(x => x.uid === user.uid)
            console.log(state.userinfo.uid);
            console.log(user.goods_id)
            this.commit('m_user/saveToUserInfoStorage')
        }
    },
    getters: {

    }
}
