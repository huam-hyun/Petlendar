import axios from 'axios'
import cryptoJS from 'crypto-js'

export default {
    namespaced: true,
    state: {
        userName: '',
        userID: '',
        pets: []
    },
    getters: {
        isLogin(state){
            return state.userID ? true : false
        }
    },
    mutations: {
        setUser(state, payload){
            state.userName = payload.Name
            state.userID = payload.ID
        },
        setPets(state, payload){
            for(let i = 0; i < payload.length; i++){
                state.pets.push(payload[i])
            }
        },
        setClear(state){
            state.userName = ''
            state.userID = ''
            state.pets = []
        }
    },
    actions: {
        async login({commit}, payload){
            console.log('로그인 함수')
            await axios({
                url: 'user/login',
                method: 'post',
                data: {
                    ID: payload.ID,
                    PW: cryptoJS.MD5(payload.PW).toString()
                }
            }).then(res=>{
                console.log(res)
                if(res.data){
                    const user = {
                        ID: res.data[0].ID,
                        Name: res.data[0].UserName
                    }
                    commit('setUser', user)
                    return user.ID
                }
            })
        },
        register(context, payload){
            axios({
                url: '/user/data',
                method: 'post',
                data:{
                    ID: payload.ID,
                    PW: cryptoJS.MD5(payload.PW).toString(),
                    Name: payload.Name
                }
            }).then(res=>{
                alert('등록 완료')
                console.log(res)
            }).catch(err=>{
                console.error(err)
            })
        },
        getPets(context){
            console.log('펫정보 불러오기 함수')
            axios({
                url: '/pet/data',
                method: 'get',
                data: context.state.userID
            }).then(res=>{
                console.log(res)
                context.commit('setPets', res.data)
            })
        },
        registerPet(context, payload){
            console.log(payload)
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