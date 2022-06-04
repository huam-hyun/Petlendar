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
        getMedical({commit}, ID){
            axios({
                url: '/medical/data',
                method: 'get',
                data: ID
            }).then(res=>{
                if(res.data){
                    commit('setMedical', res.data)
                }
            })
        }
    }
}