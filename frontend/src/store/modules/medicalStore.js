import axios from 'axios'

export default {
    namespaced: true,
    state: {
        medicalData: []
    },
    getters: {

    },
    mutations: {
        setMedical(state, payload){
            state.medicalData = payload
        }
    },
    actions: {
        async getMedical({commit}, id){
            await axios({
                url: '/medical/data',
                method: 'get',
                params: id
            }).then(res=>{
                console.log(res.data)
                if(res.data){
                    commit('setMedical', res.data)
                }
            })
        }
    }
}