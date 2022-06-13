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
                        <!-- 날짜 -->
                        <b-card-header>
                            {{date}}
                        </b-card-header>

                        <!-- 새로 추가할 메모 입력하는 곳 -->
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

                        <!-- 선택한 날짜에 메모가 있으면 나타남 -->
                        <span v-if="selectedData(date).length">
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

                        <span v-if="getAddData(date).length">
                            <b-card v-for="memo in getAddData(date)" :key="memo.tempNo">
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
            num: 1,
            selectedPet: '',
            modelConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD'
            },
        }
    },
    methods: {
        addData(){
            const payload = {
                method: 'plus',
                data: {
                    tempNo: this.num,
                    WriteDate: this.date,
                    Content: this.content,
                    MasterID: this.getID,
                    PetName: this.selectedPet
                }
            }

            this.changeAddData(payload)
            
            this.num++;
            this.content = '';
        },
        deleteData(item){
            console.log(item)
            if(item.tempNo){
                // tempNo가 있다면 아직 DB에 반영안된 자료이다
                const payload = {
                    method: 'minus',
                    data: item
                }
                this.changeAddData(payload)
            }else if(!item.tempNo){
                // 그 이외엔 DB에 있는 자료를 삭제해야 한다
                this.changeDeleteData(item)
            }
        },
        save(){
            const payload = this.getID

            this.saveData(payload)
        },
        List(){
            this.$router.push({name: 'CalendarList'})
        },
        ...calendarStore.mapActions(['saveData']),
        ...calendarStore.mapMutations(['changeAddData', 'changeDeleteData'])
    },
    computed: {
        ...userStore.mapGetters(['getID']),
        ...calendarStore.mapGetters(['selectedData', 'getAddData', 'getDeleteData']),
        ...calendarStore.mapState(['attributes']),
        ...petStore.mapState(['pets']),
    },
}
</script>

<style>

</style>