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
                        <b-row v-for="item in selectedMonth(year, month)" :key="item.CalendarNo" align-h="around">
                            <b-col cols="1"></b-col>        <!-- 좌 여백 -->
                            <b-col cols="2">
                                {{ item.WriteDate }}
                            </b-col>
                            <b-col cols="6">
                                {{ item.Content }}
                            </b-col>
                            <b-col cols="2" v-if="!item.petName">
                                모두
                            </b-col>
                            <b-col cols="2" v-if="item.petName">
                                {{ item.petName }}
                            </b-col>
                            <b-col cols="1"></b-col>        <!-- 우 여백 -->
                        </b-row>
                    </b-container>
                </b-col>                
            </b-row>
            <b-button to="/Calendar/View">캘린더 보기</b-button>
        </b-container>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
// const userStore = createNamespacedHelpers('userStore')
const calendarStore = createNamespacedHelpers('calendarStore')
// const petStore = createNamespacedHelpers('petStore')

export default {
    data(){
        let today = new Date();
        let month = today.getMonth() + 1
        let year = today.getFullYear().toString()

        return{
            year: year,
            month: month
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
        ...calendarStore.mapGetters(['selectedMonth'])
    },
    created(){
        
    }
}
</script>

<style>
.memoCard{
    background-color: beige;
}
</style>