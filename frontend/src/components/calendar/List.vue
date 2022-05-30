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
                        <b-row align-h="around">
                            <b-col cols="1"></b-col>        <!-- 좌 여백 -->
                            <b-col cols="2">
                                날짜
                            </b-col>
                            <b-col cols="6">
                                내용
                            </b-col>
                            <b-col cols="2">
                                펫 이름
                            </b-col>
                            <b-col cols="1"></b-col>        <!-- 우 여백 -->
                        </b-row>
                        <b-row v-for="item in selectedData" :key="item.no" align-h="around">
                            <b-col cols="1"></b-col>        <!-- 좌 여백 -->
                            <b-col cols="2">
                                {{ item.WriteDate }}
                            </b-col>
                            <b-col cols="6">
                                {{ item.Content }}
                            </b-col>
                            <b-col cols="2">
                                펫 이름 넣을곳
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
export default {
    data(){
        let today = new Date();
        let month = today.getMonth() + 1
        let year = today.getFullYear()

        return{
            month: month,
            year: year,
            CalendarData: [],
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

            const length = this.CalendarData.length;
            for(let i = 0; i < length ; i++){
                if(this.CalendarData[i].WriteDate.startsWith(nowDate)){
                    temp.push(this.CalendarData[i])
                }
            }

            return temp;
        }
    },
    created(){
        this.$http({
            url: '/calendar/data',
            method: 'get'
        }).then(res =>{
            this.CalendarData = res.data;
        })
    }
}
</script>

<style>
.memoCard{
    background-color: beige;
}
</style>