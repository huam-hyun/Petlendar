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
            console.log('setPets 시작')
            for(let i = 0; i < payload.length; i++){
                state.pets.push(payload[i])
            }
            console.log('setPets 끝')
        },
        setClear(state){
            state.pets = []
        }
    },
    actions: {
        async getPets({commit}, payload){
            console.log('getPets 시작')
            console.log(payload)
            await axios.get('/pet/data', {params: {id: payload}}).then(res=>{
                console.log(res.data)
                if(res.data){
                    commit('setPets', res.data)
                }
            })
            console.log('getPets 끝')
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