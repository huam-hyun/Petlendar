<template>
    <div>
        <b-container>
            회원가입

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
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const userStore = createNamespacedHelpers('userStore')

export default {
    data(){
        return {
            Register:{
                ID: '',
                PW: '',
                Name: '',
            }
        }
    },
    methods:{
        // Actions
        ...userStore.mapActions(['register']),

        async RegistUser(){
            await this.register(this.Register)
            this.Register.ID = ''
            this.Register.PW = ''
            this.Register.Name = ''
        },
    }
}
</script>