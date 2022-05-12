<template>
    <div>   
        <b-container fluid>
            <b-row>
                <b-col cols="4">
                    <b-calendar width="320px" v-model="date" @context="onContext" :hide-header="true"></b-calendar>
                </b-col>
                {{initialDate}}
                <b-col>
                    <b-card>
                        <b-card-header>
                            {{date}}
                        </b-card-header>
                        <ul v-if="selectedData.length">
                            <b-card v-for="memo in data" :key="memo.no">
                                <li>{{memo.content}}</li>
                            </b-card>
                        </ul>
                        <ul v-if="!selectedData.length">
                            <li>특이사항 없음</li>
                        </ul>

                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <b-button>리스트보기</b-button>
    </div>
</template>

<script>
import calendarData from '@/data/CalendarData'

export default {
    data(){
        let today = new Date();
        let month = today.getMonth() + 1
        if(month < 10) month = '0' + month
        let year = today.getFullYear()
        let day = today.getDate()
        today = `${year}-${month}-${day}`

        return{
            date: today,
            data: calendarData,
        }
    },
    methods: {
        onContext(ctx){
            this.context = ctx    
        }
    },
    computed: {
        selectedData : function(){
            let temp = [];
            for(let i = 0; i < this.data.length; i++){
                if(this.date === this.data[i].date){
                    temp.push(this.data[i]);
                }
            }
            return temp
        } ,
    },
}
</script>

<style>

</style>