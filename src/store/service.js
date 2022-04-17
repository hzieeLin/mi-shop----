export default {
    namespaced: true,
    state:() => ({
        service: JSON.parse(sessionStorage.getItem('service') || '[]')
}),
    mutations: {
        addToService(state, services) {
               // const findResult = state.services.find()
                state.service.push(services)
            this.commit('m_cart/saveToServiceStorage')
        },
        saveToServiceStorage(state) {
            sessionStorage.setItem('service', JSON.stringify(state.service))
        }
},
    getters: {

    }
}
