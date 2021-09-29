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
                    {{month}}월 (월 변경 버튼 만들기)
                </b-col>
            </b-row>
            <b-row>
                <b-col v-for="item in selectedMonth(this.month)" :key="item" cols="3">
                    <b-container class="memoCard">
                        <b-row>
                            <b-col>
                                a
                            </b-col>
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
        return{
            month: '2',
            year: '2021'
        }
    },
    methods: {
        selectedMonth(m){
            if( m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
                return 31
            }
            else if( m == 2 ){
                if(this.year % 400 == 0 ){
                    return 29
                }
                else if(this.year % 4 == 0 && this.year % 100 != 0){
                    return 29
                }
                else{
                    return 28
                }
            }
            else{
                return 30
            }
        }
    },
}
</script>

<style>
.memoCard{
    background-color: aquamarine;
}
</style>