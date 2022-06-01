<template>
    <div>
        <b-container>
            <b-row>
                <label for="userid">아이디</label>
                <input v-model="ID" type="text">
                <hr>
                <label for="password">비밀번호</label>
                <input v-model="PW" type="text">
                <hr>
                <label for="name">이름</label>
                <input v-model="Name" type="text">
                <br>
                <button @click="axiosPost">전송</button>
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
                <button @click="login">전송</button>
            </b-row>
            <b-row>
                ID : {{User.ID}}<br>
                이름 : {{User.Name}}
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {mapMutations, mapState, mapGetters} from 'vuex'
const cryptoJS = require('crypto-js')

export default {
    data(){
        return{
            ID : '',
            PW : '',
            Name: '',
            IDs: [],
            Login: {
                ID: '',
                PW: '',
            },
            ...mapState('userStore', ['User', 'Pets'])
        }
    },
    methods:{
        axiosPost(){
            const encrypted = cryptoJS.AES.encrypt(this.PW, '안녕').toString()
            this.$http({
                url: '/user/data',
                method: 'post',
                data: {
                    ID: this.ID,
                    PW: encrypted,
                    Name: this.Name
                }
            }).then((res)=>{
                alert('등록 완료')
                this.ID = ''
                this.PW = ''
                this.Name = ''
                console.log(res);
            }).catch((err)=>{
                console.error(err)
            })
        },
        login(){
            const encrypted = cryptoJS.AES.encrypt(this.Login.PW, '안녕').toString()
            const loginData = {
                ID: this.Login.ID,
                PW: encrypted
            }
            this.$http({
                url: '/user/login',
                method: 'post',
                data: loginData
            }).then(res=>{
                console.log(res)
                const user = {
                    ID: res.data.ID,
                    Name: res.data.UserName
                }
                this.setUser(user)
                // console.log(this.User.ID)
                // console.log(this.User.Name)
            });
            // this.$http({
            //     url: '/pet/data',
            //     method: 'get',
            //     data: this.User.ID
            // }).then(res=>{
            //     const pets = res.data

            //     this.setPets(pets)
            // })
        },
        ...mapMutations('userStore', ['setUser', 'setPets'])
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
    coumputed: {
        ...mapGetters('userStore', [''])
    }
}
</script>