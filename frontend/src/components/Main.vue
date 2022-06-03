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
                <button @click="register(Register)">전송</button>
            </b-row>
            <b-row v-for="item in IDs" :key="item.UserNo">
                ID : {{item.ID}}<br>
                PW : {{item.PW}}<br>
                이름 : {{item.UserName}}
            </b-row>
        </b-container>
        <b-container>
            로그인 기능 확인
            <b-row>
                <label for="userid">아이디</label>
                <input v-model="Login.ID" type="text">
                <hr>
                <label for="password">비밀번호</label>
                <input v-model="Login.PW" type="text">
                <hr>
                <button @click="login(Login)">전송</button>
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
            Name: '',
            IDs: [],
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
        ...calendarStore.mapMutations([]),
        ...medicalStore.mapMutations([]), 
    },
    created(){
        this.$http({
            url: '/user/list',
            method: 'get'
        }).then((res) =>{
            console.log(res);
            this.IDs = res.data;
        })
    },
    computed: {
        ...userStore.mapState(['userName', 'userID', 'Pets']),
        ...calendarStore.mapState([]),
        ...medicalStore.mapState([])
    }
}
</script>