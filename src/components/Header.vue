<template>
    <div>
        <b-container fluid>
            <b-row align-h="end">
                <b-col id="title" cols="4" @click="goHome" class="pointer"><strong>Petlendar</strong></b-col>
                <b-col cols="4" style="text-align: right;">&nbsp;<span>회원가입</span>&nbsp;<span>로그인</span></b-col>
                <!-- <b-col cols="4" style="text-align: right;">회원 님 <span style="font-weight: bold;">로그아웃</span></b-col> -->
                <div class="w-100"></div>
            </b-row>
            <b-row align-h="around">
                <b-col cols="2" @click="goCalendar">
                    캘린더
                </b-col>
                <b-col cols="2" @click="goMedical">
                    의료일지
                </b-col>
                <b-col cols="2">
                    
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        goHome(){
            this.$router.push('/').catch(()=>{})
        },
        goCalendar(){
            this.$router.push('/Calendar/List')
        },
        goMedical(){
            this.$router.push('/Medical/List')
        }
    }
}
</script>

<style>
#title{
    font-size: 35px;
}
</style>