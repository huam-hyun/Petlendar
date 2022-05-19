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
            <b-row align-h="center" v-for="item in List" :key="item.no" @click="onClick(item.no)" class="listContent">
                <b-col cols="2">
                    {{item.date}}
                </b-col>
                <b-col cols="4">
                    {{item.cause}}
                </b-col>
                <b-col cols="2">
                    {{item.cost}}
                </b-col>
            </b-row>
        </b-container>
        <b-button @click="goWrite">작성하기</b-button>
    </div>
</template>

<script>
import Data from '@/data/PetData'

export default {
    data(){
        return{
            List: Data
        }
    },
    methods:{
        onClick(num){
            this.$router.push({name:'MedicalDetail', params:{no: num}})
        },
        goWrite(){
            this.$router.push({name:'MedicalWrite'})
        }
    }
}
</script>

<style>
.listHeader{
   font-size: 20px;
   font-weight: bold;
}
</style>