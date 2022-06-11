import axios from 'axios'

export default{
    namespaced: true,
    state: {
        pets: []
    },
    getters: {
        
    },
    mutations: {
        setPets(state, payload){
            for(let i = 0; i < payload.length; i++){
                state.pets.push(payload[i])
            }
        },
        setClear(state){
            state.pets = []
        }
    },
    actions: {
        async getPets({commit}, payload){
            console.log(payload)
            await axios({
                url: '/pet/data',
                params: {id: payload}
            }).then(res=>{
                console.log(res.data)
                if(res.data){
                    commit('setPets', res.data)
                }
            })
        },
        registerPet(context, payload){
            const petData = Object.values(payload)
            axios({
                url: '/pet/data',
                method: 'post',
                data: petData
            }).then(res=>{
                console.log(res);
                if(res.status === 200){
                    alert('등록 완료')
                }
            })
        }
    }
}