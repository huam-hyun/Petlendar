<template>
    <div>   
        <b-container fluid>
            <b-row align-h="around">
                <b-col cols="1"></b-col>
                <b-col cols="3">
                    <b-calendar block v-model="date" :hide-header="true"></b-calendar>
                </b-col>
                <b-col cols="5">
                    <b-card>
                        <b-card-header>
                            {{date}}
                        </b-card-header>
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
                            <b-card v-for="memo in forAddData" :key="memo.tempNo">
                                <b-row>
                                    <b-col>
                                        {{memo.Content}}
                                    </b-col>
                                    <b-col cols="1">
                                        <span @click="deleteData(memo)">X</span>
                                    </b-col>
                                </b-row>
                            </b-card>
                            <b-card>
                                <b-row>
                                    <b-col>
                                        <b-input v-model="content">

                                        </b-input>
                                    </b-col>
                                    <b-col cols="1">
                                        <span @click="addData()">V</span>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </span>
                        <span v-if="!selectedData.length">
                            <b-card>기록 없음</b-card>
                            <b-card>
                                <b-row align-h="around">
                                    <b-col cols="10">
                                        <b-input v-model="content">

                                        </b-input>
                                    </b-col>
                                    <b-col>
                                        <span @click="addData()">V</span>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </span>

                    </b-card>
                </b-col>
                <b-col cols="1"></b-col>
            </b-row>
        </b-container>
        <b-button @click="List()">리스트보기</b-button>
        <b-button @click="save()">저장</b-button>
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
            selectedPet: ''
        }
    },
    methods: {
        addData(){
            const newData = {
                tempNo: this.num,
                WriteDate: this.date,
                Content: this.content,
                MasterID: this.userID,
                PetName: this.selectedPet,
            }
            this.forAddData.push(newData);
            this.num++;
            this.content = '';
        },
        deleteData(item){
            if(item.CalendarNo){
                // DB에 등록돼 있는 데이터는 CalendarNo가 있으니 삭제 요청을 위한 배열에 CalendarNo를 추가
                this.forDeleteData.push(item.CalendarNo);
                console.log(this.forDeleteData);
                const index = this.calendarData.findIndex(e => e.CalendarNo === item.CalendarNo);
                this.calendarData.splice(index, 1);
            }else{
                // 사용자가 입력해서 DB에 저장은 안됐지만 삭제할 데이터들
                const index = this.forAddData.findIndex(e => e.tempNo === item.tempNo);
                this.forAddData.splice(index, 1);
            }
        },
        save(){
            const addData = this.forAddData ? this.forAddData : 0
            const deleteData = this.forDeleteData ? this.forDeleteData : 0
            const payload = [ addData, deleteData, this.userID ]

            this.saveData(payload)

            this.forAddData = []
            this.forDeleteData = []
        },
        List(){
            this.$router.push({name: 'CalendarList'})
        },
        ...calendarStore.mapActions(['saveData'])
    },
    computed: {
        ...userStore.mapState(['userID']),
        ...calendarStore.mapState(['calendarData']),
        ...calendarStore.mapGetters(['selectedData']),
        ...petStore.mapState(['pets'])
    },
}
</script>

<style>

</style>