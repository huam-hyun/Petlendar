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
                    불러온 펫 데이터
                    <b-card>
                        이름: {{item.PetName}}<br>
                        성별: {{item.Sex}}<br>
                        종류: {{item.PetType}}
                    </b-card>
                </b-col>
                <b-col>
                    불러온 캘린더 데이터
                    <b-card v-for="item in calendarData" :key="item.CalendarNo">
                        내용 : {{item.Content}}<br>
                        ID : {{item.MasterID}}<br>
                        펫 : {{item.PetName}}<br>
                        작성날짜 : {{item.WriteDate}}
                    </b-card>
                </b-col>
                <b-col>
                    불러온 의료 데이터
                    <b-card v-for="item in medicalData" :key="item.MedicalNo">
                        내원이유 : {{item.Cause}}<br>
                        증상 : {{item.Content}}<br>
                        비용 : {{item.Cost}}<br>
                        ID : {{item.MasterID}}<br>
                        내원날짜 : {{item.MedicalDate}}<br>
                        펫 : {{item.PetName}}<br>
                        처방 : {{item.Prescription}}
                    </b-card>
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
        }
    },
    methods:{
        // Getters
        ...userStore.mapGetters(['isLogin']),

        // Actions
        ...userStore.mapActions(['login', 'register']),
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
            await this.login(this.Login)
            this.Login.ID = ''
            this.Login.PW = ''

            if(this.isLogin()){    // 로그인 성공시
                // 펫정보 불러오기
                this.getPets(this.userID)

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
        // States
        ...userStore.mapState(['userName', 'userID']),
        ...petStore.mapState(['pets']),
        ...calendarStore.mapState(['calendarData']),
        ...medicalStore.mapState(['medicalData'])
    }
}
</script>