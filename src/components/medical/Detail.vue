<template>
    <div>
        <b-container>
            <b-form-row class="medicalForm">
                <b-col md="6" offset-md="3">
                    <b-card>
                        <label>날짜</label>
                        <p>{{data.date}}</p>
                        <br>
                        <label>내원이유</label>
                        <p>{{data.cause}}</p>
                        <br>
                        <label>내용</label>
                        <p>{{data.text}}</p>
                        <br>
                        <label>처방</label>
                        <p>{{data.prescription}}</p>
                        <br>
                        <label>비용</label>
                        <p>{{data.cost}}</p>
                    </b-card>
                    <br>
                    <b-button @click="goWrite">수정하기</b-button><b-button @click="goBack">뒤로가기</b-button>
                </b-col>
            </b-form-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data1: this.$route.params.no,   //가져온 MedicalList no
            data: {     //가져온 데이터가 이것이라고 가정       select * from MedicalList where no=1
                    no: '1',
                    date: '2021-09-24',
                    cause: '구토',
                    text: '23일 저녁부터 갈색 구토를 함',
                    prescription: '계속 지켜볼 것',
                    cost: '5000',
                    petname: '콩이',
                    master: '박상현'
                },
        }
    },
    methods:{
        goBack(){ //뒤로가기
            this.$router.go(-1)
        },
        goWrite(num){   //수정하기
            this.$router.push({name:'MedicalWrite', params:{no: num}})
        }
    }
}
</script>

<style>

</style>