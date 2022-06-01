const userStore = {
    namespaced: true,
    state: {
        UserName: '',
        PetName: []
    },
    getters: {

    },
    mutations: {
        setUserName(state, name){
            state.UserName = name
        }
    },
    actions: {
        getUserInfo(){
            this.$http({
                url: '/db/list',
                method: 'get',
                data: ''
            })
        }
    }
}

export default {
    userStore
}