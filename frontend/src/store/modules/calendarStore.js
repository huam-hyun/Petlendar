import axios from 'axios'

export default {
    namespaced: true,
    state: {
        calendarData: [],

    },
    getters: {
        selectedData(state, PetID){
            if(!PetID) return state.calendarData
            return state.calendarData.filter(e => e.PetID === PetID)
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
        saveData({commit}, payload){
            console.log(payload)
            const [addData, deleteData, ID] = payload
            // 추가된 목록이 있다면 실행
            if(addData){
                let data = []
                for(let i = 0; i < addData.length; i++){
                    delete addData[i].tempNo;
                    data.push(Object.values(addData[i]))
                }
                data.push(ID)

                axios({
                    url: '/calendar/data',
                    method: 'post',
                    data: data
                }).then(res=>{
                    console.log(res)
                    commit('')
                })
            }
            // 삭제한 목록이 있다면 실행
            if(deleteData){
                axios({
                    url: '/calendar/data',
                    method: 'delete',
                    data: deleteData
                })
            }
        }
    }
}
