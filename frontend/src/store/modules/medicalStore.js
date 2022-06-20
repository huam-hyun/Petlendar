import axios from 'axios'

export default {
    namespaced: true,
    state: {
        medicalData: []
    },
    getters: {
        getData(state){
            return state.medicalData
        },
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
        },
        async postMedical(context, payload){
            return await axios({
                url: '/medical/data',
                method: 'post',
                data: payload
            })
        },
        async updateMedical(context, payload){
            await axios({
                url: '/medical/data',
                method:'put',
                data: payload
            }).then(res=>{
                console.log(res)
            })
        }
    }
}