import axios from 'axios'

export default {
    namespaced: true,
    state: {
        calendarData: [],
    },
    getters: {
        selectedData: (state) => (date) =>{
            return state.calendarData.filter(e => e.WriteDate === date)
        }
    },
    mutations: {
        setCalendar(state, payload){
            state.calendarData = payload
        },
    },
    actions: {
        async getCalendar({commit}, id){
            await axios({
                url: '/calendar/data',
                method: 'get',
                params: id
            }).then(res=>{
                console.log(res.data)
                if(res.data){
                    commit('setCalendar', res.data)
                }
            })
        },
        async saveData({commit}, payload){
            console.log(payload)
            const [addData, deleteData, ID] = payload
            console.log('addData')
            console.log(addData)
            console.log('deleteData')
            console.log(deleteData)
            // 추가된 목록이 있다면 실행
            if(addData.length){
                const data = {
                    add: [],
                    id: ID
                }
                for(let i = 0; i < addData.length; i++){
                    delete addData[i].tempNo;
                    data.add.push(Object.values(addData[i]))
                }

                await axios({
                    url: '/calendar/data',
                    method: 'post',
                    data: data
                }).then(res=>{
                    console.log(res)
                    commit('setCalendar', res.data)
                })
            }
            // 삭제한 목록이 있다면 실행
            if(deleteData.length){
                axios({
                    url: '/calendar/data',
                    method: 'delete',
                    data: deleteData
                })
            }
        }
    }
}
