const calendarStore = {
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
        }
    },
    actions: {
        saveData(addData, deleteData){
            // 추가된 목록이 있다면 실행
            if(addData){
                let data = []
                for(let i = 0; i < addData.length; i++){
                    delete addData[i].tempNo;
                    data.push(Object.values(addData[i]))
                }
                
                console.log(data)

                this.$http({
                    url: '/calendar/data',
                    method: 'post',
                    data: data
                })
            }
            // 삭제한 목록이 있다면 실행
            if(deleteData){
                this.$http({
                    url: '/calendar/data',
                    method: 'delete',
                    data: deleteData
                })
            }
        }
    }
}

export default {
    calendarStore
}
