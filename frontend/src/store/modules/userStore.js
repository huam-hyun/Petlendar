import axios from 'axios'
import cryptoJS from 'crypto-js'

export default {
    namespaced: true,
    state: {
        userName: '',
        userID: '',
    },
    getters: {
        isLogin(state){
            return state.userID ? true : false
        },
        getID(state){
            return state.userID
        }
    },
    mutations: {
        setUser(state, payload){
            state.userName = payload.Name
            state.userID = payload.ID
        },
        setClear(state){
            state.userName = ''
            state.userID = ''
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
    }
}