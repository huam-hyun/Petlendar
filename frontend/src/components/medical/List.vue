<template>
    <div>
        <b-container>
            <b-row align-h="center" class="listHeader">
                <b-col cols="2">
                    날짜
                </b-col>
                <b-col cols="4">
                    내원이유
                </b-col>
                <b-col cols="2">
                    비용
                </b-col>
            </b-row>
            <b-row align-h="center" v-for="item in List" :key="item.no" @click="onClick(item)" class="listContent">
                <b-col cols="2">
                    {{item.MedicalDate}}
                </b-col>
                <b-col cols="4">
                    {{item.Cause}}
                </b-col>
                <b-col cols="2">
                    {{item.Cost}}
                </b-col>
            </b-row>
        </b-container>
        <b-button @click="goWrite">작성하기</b-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            List: []
        }
    },
    methods:{
        onClick(item){
            this.$router.push({name:'MedicalDetail', params:{MedicalData: item}})
        },
        goWrite(){
            this.$router.push({name:'MedicalWrite'})
        }
    },
    created(){
        this.$http.post('/medical/list').then((res) =>{
            console.log(res);
            if(res.data){
                this.List = res.data;
            }
        })
    }
}
</script>

<style>
.listHeader{
   font-size: 20px;
   font-weight: bold;
}
</style>