<template>
    <div>
        <b-container>
            <b-form-row class="medicalForm">
                <b-col md="6" offset-md="3">
                    <b-card>
                        <label>날짜</label>
                        <p>{{MedicalData.date}}</p>
                        <br>
                        <label>내원이유</label>
                        <p>{{MedicalData.cause}}</p>
                        <br>
                        <label>내용</label>
                        <p>{{MedicalData.text}}</p>
                        <br>
                        <label>처방</label>
                        <p>{{MedicalData.prescription}}</p>
                        <br>
                        <label>비용</label>
                        <p>{{MedicalData.cost}}</p>
                    </b-card>
                    <br>
                    <b-button @click="goWrite(MedicalData.no)">수정하기</b-button><b-button @click="goBack">뒤로가기</b-button>
                </b-col>
            </b-form-row>
        </b-container>
    </div>
</template>

<script>
import PetData from '@/data/PetData';

export default {
    data(){
        return{
            data1: this.$route.params.no,   //가져온 MedicalList no
            MedicalData: PetData[this.$route.params.no-1]
        }
    },
    methods:{
        goBack(){       //뒤로가기
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