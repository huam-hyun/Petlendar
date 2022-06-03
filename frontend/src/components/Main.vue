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
                ID : {{userID}}<br>
                이름 : {{userName}}
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
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
        }
    },
    methods:{
        axiosPost(){
            const hashed = cryptoJS.MD5(this.PW).toString()
            this.$http({
                url: '/user/data',
                method: 'post',
                data: {
                    ID: this.ID,
                    PW: hashed,
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
            const hashed = cryptoJS.MD5(this.Login.PW).toString()
            this.$http({
                url: '/user/login',
                method: 'post',
                data: {
                    ID: this.Login.ID,
                    PW: hashed
                }
            }).then(res=>{
                console.log(res)
                const user = {
                    ID: res.data[0].ID,
                    Name: res.data[0].UserName
                }
                this.setUser(user)
                this.Login.ID = ''
                this.Login.PW = ''
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
    computed: {
        ...mapState('userStore', ['userName', 'userID', 'Pets'])
    }
}
</script>