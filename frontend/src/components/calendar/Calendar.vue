<template>
    <div>   
        <b-container fluid>
            <b-row align-h="around">
                <b-col cols="1"></b-col>
                <b-col cols="3">
                    <v-date-picker
                        title-position="left"
                        trim-weeks
                        v-model="date"
                        :model-config="modelConfig"
                        is-expanded
                        :attributes="attributes"
                    />
                </b-col>
                <b-col cols="5">
                    <b-card>
                        <b-card-header>
                            {{date}}
                        </b-card-header>
                        <b-card>
                            <b-row align-h="between" align-v="center">
                                <b-col cols="11">
                                    <b-input v-model="content">

                                    </b-input>
                                </b-col>
                                <b-col cols="1">
                                    <span @click="addData()">V</span>
                                </b-col>
                            </b-row>
                        </b-card>
                        <span v-if="selectedData.length">
                            <b-card v-for="memo in selectedData(date)" :key="memo.CalendarNo">
                                <b-row>
                                    <b-col>
                                        {{memo.Content}}
                                    </b-col>
                                    <b-col cols="1">
                                        <span @click="deleteData(memo)">X</span>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </span>
                        <span v-if="!selectedData.length">
                            <b-row v-if="selectedForAddData.length">
                                <b-row v-for="memo in selectedForAddData" :key="memo.tempNo">
                                    <b-col>
                                        {{memo.Content}}
                                    </b-col>
                                    <b-col cols="1">
                                        <span @click="deleteData(memo)">X</span>
                                    </b-col>
                                </b-row>
                            </b-row>
                            <b-row v-if="!selectedForAddData.length">
                                기록 없음
                            </b-row>
                        </span>
                    </b-card>
                </b-col>
                <b-col cols="1"></b-col>
            </b-row>
        </b-container>
        <b-button @click="List()">리스트보기</b-button>
        <b-button @click="save()">저장</b-button>
        <hr>
        {{oldDatas}}
        <hr>
        {{attributes[0].dates}}
        <hr>
        {{deleteDatas}}
        
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const userStore = createNamespacedHelpers('userStore')
const calendarStore = createNamespacedHelpers('calendarStore')
const petStore = createNamespacedHelpers('petStore')

export default {
    data(){
        let today = new Date();
        let month = today.getMonth() + 1
        let year = today.getFullYear()
        let day = today.getDate()
        if(month < 10) month = '0' + month
        if(day < 10) day = '0' + day
        today = `${year}-${month}-${day}`

        return{
            date: today,
            content: '',
            forAddData: [],
            forDeleteData: [],
            num: 0,
            selectedPet: '',
            modelConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD'
            },
            attributes: [
                // 메모가 있는 날을 표시
                {
                    dot: 'green',
                    dates: []
                },
                // 새로 추가한 메모가 있는 날
                {
                    dot: 'blue',
                    dates: []
                },
                // 삭제될 메모가 있는 날
                {
                    dot: 'red',
                    dates: []
                }
            ],
            a: []
        }
    },
    methods: {
        addData(){
            const newData = {
                tempNo: this.num,
                WriteDate: this.date,
                Content: this.content,
                MasterID: this.getID,
                PetName: this.selectedPet,
            }
            this.forAddData.push(newData);

            // 데이터 추가시 변경점이 있다고 표시해줌
            this.num++;
            this.content = '';
        },
        deleteData(item){
            if(item.CalendarNo){
                // DB에 등록돼 있는 데이터는 CalendarNo가 있으니 삭제 요청을 위한 배열에 CalendarNo를 추가
                this.forDeleteData.push(item);
                console.log(this.forDeleteData);
                this.calendarData.findIndex(e => e.CalendarNo === item.CalendarNo);

            }else{
                // 사용자가 입력해서 DB에 저장은 안됐지만 삭제할 데이터들
                const index = this.forAddData.findIndex(e => e.tempNo === item.tempNo);
                this.forAddData.splice(index, 1);

                // deleteDots
            }
        },
        save(){
            const addData = this.forAddData ? this.forAddData : 0
            const deleteData = this.forDeleteData ? this.forDeleteData : 0
            const payload = [ addData, deleteData, this.getID ]

            if(addData === 0 && deleteData === 0){
                alert('수정된 부분이 없습니다')
                return
            }

            this.saveData(payload)

            this.forAddData = []
            this.forDeleteData = []
        },
        List(){
            this.$router.push({name: 'CalendarList'})
        },
        ...calendarStore.mapActions(['saveData']),
    },
    computed: {
        ...userStore.mapGetters(['getID']),
        ...calendarStore.mapState(['calendarData']),
        ...calendarStore.mapGetters(['selectedData']),
        ...petStore.mapState(['pets']),
        selectedForAddData(){
            return this.forAddData.filter(e => e.WriteDate === this.date)
        },
    },
}
</script>

<style>

</style>