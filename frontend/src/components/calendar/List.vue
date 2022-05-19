<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    특이사항 리스트
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button @click="decreaseDate()">&lt;</b-button>
                </b-col>
                <b-col>
                    {{year}}년 {{month}}월
                </b-col>
                <b-col>
                    <b-button @click="increaseDate()">></b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-container class="memoCard">
                        <b-row v-for="item in selectedData" :key="item.no" align-h="around">
                            <b-col cols="1"></b-col>        <!-- 좌 여백 -->
                            <b-col cols="1">
                                {{ item.date }}
                            </b-col>
                            <b-col cols="6">
                                {{ item.content }}
                            </b-col>
                            <b-col cols="1"></b-col>        <!-- 우 여백 -->
                        </b-row>
                    </b-container>
                </b-col>                
            </b-row>
        </b-container>
    </div>
</template>

<script>
import calendarData from '@/data/CalendarData'

export default {
    data(){
        let today = new Date();
        let month = today.getMonth() + 1
        let year = today.getFullYear()

        return{
            month: month,
            year: year,
            data: calendarData,
        }
    },
    methods: {
        decreaseDate(){
            if(--this.month < 1){
                this.year--
                this.month = 12
            }
        },
        increaseDate(){
            if(++this.month > 12){
                this.year++
                this.month = 1
            }
        }
    },
    computed: {
        selectedData(){
            let temp = []
            let nowDate = ''

            if(this.month < 10){
                nowDate = `${this.year}-0${this.month}`
            } else{
                nowDate = `${this.year}-${this.month}`
            }

            for(let i = 0; i < this.data.length; i++){
                if(this.data[i].date.startsWith(nowDate)){
                    temp.push(this.data[i])
                }
            }

            return temp;
        }
    }
}
</script>

<style>
.memoCard{
    background-color: beige;
}
</style>