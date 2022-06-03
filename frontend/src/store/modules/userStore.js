export default {
    namespaced: true,
    state: {
        userName: '',
        userID: '',
        Pets: []
    },
    getters: {

    },
    mutations: {
        setUser(state, payload){
            state.userName = payload.Name
            state.userID = payload.ID
            // console.log(state.User)
        },
        setPets(state, payload){
            for(let i = 0; i < payload.length; i++){
                state.Pets.push(payload[i])
            }
        }
    },
    actions: {
        
    }
}