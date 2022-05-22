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
    </div>
</template>

<script>
export default {
    data(){
        return{
            ID : '',
            PW : '',
            Name: '',
            IDs: []
        }
    },
    methods:{
        axiosPost(){
            this.$http({
                url: '/db/regist',
                method: 'post',
                data: {
                    ID: this.ID,
                    PW: this.PW,
                    Name: this.Name
                }
            }).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.error(err)
            })
        }
    },
    created(){
        this.$http({
            url: '/db/list',
            method: 'post'
        }).then((res) =>{
            console.log(res);
            this.IDs = res.data;
        })
    }
}
</script>