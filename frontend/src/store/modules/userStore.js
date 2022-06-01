export default {
    namespaced: true,
    state: {
        User: {
            Name: '',
            ID: ''
        },
        Pets: []
    },
    getters: {
        
    },
    mutations: {
        setUser(state, payload){
            state.User.Name = payload.Name
            state.User.ID = payload.ID
        },
        setPets(state, payload){
            for(let i = 0; i < payload.length; i++){
                state.Pets.push(payload[i])
            }
        }
    },
    actions: {
        // getUserInfo({commit, dispatch}, Auth){
        //     this.$http({
        //         url: '/user/login',
        //         method: 'post',
        //         data: Auth
        //     }).then((res)=>{
        //         const userInfo = res.data[0]    // {ID: '', UserName: ''}
        //         if(userInfo){
        //             commit('setUser', userInfo)
        //             dispatch('getPetInfo', {
        //                 ID: userInfo.ID
        //             })
        //         }else{
        //             // !userInfo
        //         }
        //     })
        // },
        // getPetInfo({commit}, payload){
        //     this.$http({
        //         url: '/pet/data',
        //         method: 'get',
        //         data: payload.ID
        //     }).then(res=>{
        //         const petInfo = res.data
        //         if(petInfo){
        //             commit('setPets', petInfo)
        //         }
        //     })
        // }
    }
}