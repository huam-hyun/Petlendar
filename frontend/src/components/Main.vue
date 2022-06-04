<template>
    <div>
        <b-container>
            회원가입 기능 확인
            <b-row>
                <label for="userid">아이디</label>
                <input v-model="Register.ID" type="text">
                <hr>
                <label for="password">비밀번호</label>
                <input v-model="Register.PW" type="text">
                <hr>
                <label for="name">이름</label>
                <input v-model="Register.Name" type="text">
                <br>
                <button @click="newUser">전송</button>
            </b-row>
        </b-container>
        <hr>
        <b-container>
            로그인 기능 확인
            <b-row>
                <label for="userid">아이디</label>
                <input v-model="Login.ID" type="text">
                <hr>
                <label for="password">비밀번호</label>
                <input v-model="Login.PW" type="text">
                <hr>
                <button @click="setUser">전송</button>
            </b-row>
            <b-row>
                ID : {{userID}}<br>
                이름 : {{userName}}
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const calendarStore = createNamespacedHelpers('calendarStore')
const medicalStore = createNamespacedHelpers('medicalStore')
const userStore = createNamespacedHelpers('userStore')

export default {
    data(){
        return{
            Login: {
                ID: '',
                PW: '',
            },
            Register: {
                ID: '',
                PW: '',
                Name: '',
            }
        }
    },
    methods:{
        ...userStore.mapMutations(['setUser', 'setPets']),
        ...userStore.mapActions(['login', 'register']),
        ...calendarStore.mapActions(['getCalendar']),
        ...medicalStore.mapActions(['getMedical']),
        newUser(){
            this.register(this.Register)
            this.Register.ID = ''
            this.Register.PW = ''
            this.Register.Name = ''
        },
        setUser(){
            // 로그인
            this.login(this.Login)
            this.Login.ID = ''
            this.Login.PW = ''

            if(this.userID){    // 로그인 성공시
                // 캘린더정보 불러오기
                this.getCalendar(this.userID)

                // 의료정보 불러오기
                this.getMedical(this.userID)
            }
        },
    },
    created(){
        
    },
    computed: {
        ...userStore.mapState(['userName', 'userID', 'Pets']),
        ...calendarStore.mapState([]),
        ...medicalStore.mapState([])
    }
}
</script>