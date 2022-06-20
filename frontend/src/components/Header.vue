<template>
    <div>
        <b-container fluid>
            <b-row align-h="end">
                <b-col id="title" cols="4" @click="goHome" class="pointer"><strong>Petlendar</strong></b-col>
                <b-col cols="4" style="text-align: right;">&nbsp;
                    <span @click="goRegist">회원가입</span>&nbsp;
                    <span v-b-modal.login>로그인</span>
                </b-col>
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
                <b-col cols="2" @click="goPet">
                    펫
                </b-col>
            </b-row>
        </b-container>
        <b-modal
            id="login"
            title="로그인"
            @show="resetModal"
            @hidden="resetModal"
            @ok="setUser"
            >
            <b-row>
                <label for="userid">아이디</label>
                <input v-model="Login.ID" type="text" id="userid">
                <br/>
                <label for="password">비밀번호</label>
                <input v-model="Login.PW" type="password" id="password">
            </b-row>
        </b-modal>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const userStore = createNamespacedHelpers('userStore')
const petStore = createNamespacedHelpers('petStore')
const calendarStore = createNamespacedHelpers('calendarStore')
const medicalStore = createNamespacedHelpers('medicalStore')

export default {
    data(){
        return{
            Login: {
                ID: '',
                PW: '',
            }
        }
    },
    methods: {
        goHome(){
            this.$router.push('/').catch(()=>{})
        },
        goCalendar(){
            this.$router.push('/Calendar/View')
        },
        goMedical(){
            this.$router.push('/Medical/List')
        },
        goPet(){
            this.$router.push('/User/Pet')
        },
        goRegist(){
            this.$router.push({name: 'Regist'})
        },
        resetModal(){
            this.Login.ID = ''
            this.Login.PW = ''
        },
        async setUser(){
            await this.login(this.Login)
            
            if(this.isLogin){
                this.getPets(this.getID)
                this.getCalendar(this.getID)
                this.getMedical(this.getID)
            }
        },
        ...userStore.mapActions(['login']),
        ...petStore.mapActions(['getPets']),
        ...calendarStore.mapActions(['getCalendar']),
        ...medicalStore.mapActions(['getMedical'])
    },
    computed:{
        ...userStore.mapGetters(['isLogin', 'getID'])
    }
}
</script>

<style>
#title{
    font-size: 35px;
}
</style>