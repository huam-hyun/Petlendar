import axios from 'axios'

export default {
    namespaced: true,
    state: {
        calendarData: [],
        addData: [],
        deleteData: [],
        attributes:[
            {
                dot: 'green',
                dates: []
            },
            {
                dot: 'blue',
                dates: []
            },
            {
                dot: 'red',
                dates: []
            },
        ]
    },
    getters: {
        selectedData: (state) => (date) =>{
            return state.calendarData.filter(e => e.WriteDate === date)
        },
        selectedMonth: (state) => (year, month) =>{
            month = month < 10 ? '0' + month : month
            const date = `${year}-${month}`
            return state.calendarData.filter(e => e.WriteDate.startsWith(date))
        },
        getAddData: (state) => (date) =>{
            return state.addData.filter(e => e.WriteDate === date)
        },
        getDeleteData(state){
            return state.deleteData
        }
    },
    mutations: {
        setCalendar(state, payload){
            state.attributes[0].dates = []
            state.calendarData = payload
            payload.map(e => state.attributes[0].dates.push(e.WriteDate))
        },
        changeAddData(state, payload){
            if(payload.method === 'plus'){
                // 자료를 추가할 때
                state.addData.push(payload.data)
                state.attributes[1].dates.push(payload.data.WriteDate)
            }else{
                // 아직 DB에 반영이 안된 추가할 자료를 삭제할 때
                const index = state.addData.findIndex(e => e.tempNo === payload.data.tempNo)
                state.addData.splice(index, 1)
                // addData와 attributes[1].dates에 추가된 인덱스는 같다
                state.attributes[1].dates.splice(index, 1)
            }
        },
        changeDeleteData(state, payload){
            // DB에 있던 자료를 삭제할 때
            state.deleteData.push(payload)
            state.attributes[2].dates.push(payload.WriteDate)
        },
        reset(state){
            state.addData = []
            state.attributes[1].dates = []
            state.deleteData = []
            state.attributes[2].dates = []
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
        async saveData({state, commit}, payload){
            console.log(payload)
            const id = payload

            // 추가된 목록이 있다면 실행
            // tempNo를 지워주는 작업을 해야함
            if(state.addData.length){
                const data = []
                for(let i = 0; i < state.addData.length; i++){
                    delete state.addData[i].tempNo;
                    data.push(Object.values(state.addData[i]))
                }

                await axios({
                    url: '/calendar/data',
                    method: 'post',
                    data: data
                })
            }

            // 삭제한 목록이 있다면 실행
            if(state.deleteData.length){
                const data = state.deleteData.map(e => e.CalendarNo)
                await axios({
                    url: '/calendar/data',
                    method: 'delete',
                    data: data
                })
            }

            // 수정된 데이터로 calendarStore update
            await axios({
                url: '/calendar/data',
                method: 'get',
                params: id
            }).then(res =>{
                if(res.data){
                    commit('setCalendar', res.data)
                    commit('reset')
                }
            })
        }
    }
}
