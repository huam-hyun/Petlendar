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
        getPets(context, payload){
            console.log('payload\n' + payload)
            const ID = payload.ID
            axios({
                url: '/pet/data',
                method: 'get',
                data: ID
            }).then(res=>{
                if(res.data){
                    context.commit('setPets', res.data)
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