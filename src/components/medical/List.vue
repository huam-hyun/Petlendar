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
    </div>
</template>

<script>
export default {
    data(){
        return{
            List: [ //나중에 DB로 교체할 것
                {
                    no: '1',
                    date: '2021-09-24',
                    cause: '구토',
                    text: '23일 저녁부터 갈색 구토를 함',
                    prescription: '계속 지켜볼 것',
                    cost: '5000',
                    petname: '콩이',
                    master: '박상현'
                },
                {
                    no: '2',
                    date: '2021-09-29',
                    cause: '설사',
                    text: '3일동안 설사했음',
                    prescription: '약 처방',
                    cost: '20000',
                    petname: '콩이',
                    master: '박상현'
                },
            ]
        }
    },
    methods:{
        onClick(num){
            this.$router.push({name:'MedicalDetail', params:{no: num}})
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