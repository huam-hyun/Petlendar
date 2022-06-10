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
            <hr>
            <b-row v-for="item in pets" :key="item.MasterID">
                <b-col>
                    이름: {{item.PetName}}
                    성별: {{item.Sex}}
                    종류: {{item.PetType}}
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const calendarStore = createNamespacedHelpers('calendarStore')
const medicalStore = createNamespacedHelpers('medicalStore')
const userStore = createNamespacedHelpers('userStore')
const petStore = createNamespacedHelpers('petStore')

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
            },
            pets: [],
        }
    },
    methods:{
        ...userStore.mapActions(['login', 'register']),
        ...userStore.mapGetters(['isLogin']),
        ...calendarStore.mapActions(['getCalendar']),
        ...medicalStore.mapActions(['getMedical']),
        ...petStore.mapActions(['getPets']),
        newUser(){
            this.register(this.Register)
            this.Register.ID = ''
            this.Register.PW = ''
            this.Register.Name = ''
        },
        async setUser(){
            // 로그인
            const ID = await this.login(this.Login)
            this.Login.ID = ''
            this.Login.PW = ''

            if(this.isLogin()){    // 로그인 성공시
                // 펫정보 불러오기
                this.getPets({ID: ID})

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
        ...userStore.mapState(['userName', 'userID', 'pets']),
        ...calendarStore.mapState([]),
        ...medicalStore.mapState([])
    }
}
</script>