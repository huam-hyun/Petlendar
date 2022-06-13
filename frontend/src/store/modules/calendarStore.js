import axios from 'axios'

export default {
    namespaced: true,
    state: {
        calendarData: [],
        addData: [],
        deleteData: []
    },
    getters: {
        selectedData: (state) => (date) =>{
            return state.calendarData.filter(e => e.WriteDate === date)
        },
        getCalendarData(state){
            return state.calendarData
        },
        getAddData(state){
            return state.addData
        },
        getDeleteData(state){
            return state.deleteData
        }
    },
    mutations: {
        setCalendar(state, payload){
            state.calendarData = payload
        },
        setAddData(state, payload){
            state.addData.push(payload.WriteDate)
        },
        setDeleteData(state, payload){
            state.deleteData.push(payload.WriteDate)
        }
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
                const data = deleteData.map(e => e.CalendarNo)
                axios({
                    url: '/calendar/data',
                    method: 'delete',
                    data: data
                })
            }
        }
    }
}
