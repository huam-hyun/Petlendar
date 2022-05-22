<template>
    <div>
        <b-container>
            <b-form-row class="medicalForm">
                <b-col md="6" offset-md="3">
                    <b-card>
                        <label>날짜</label>
                        <p>{{MedicalData.MedicalDate}}</p>
                        <br>
                        <label>내원이유</label>
                        <p>{{MedicalData.Cause}}</p>
                        <br>
                        <label>내용</label>
                        <p>{{MedicalData.Content}}</p>
                        <br>
                        <label>처방</label>
                        <p>{{MedicalData.Prescription}}</p>
                        <br>
                        <label>비용</label>
                        <p>{{MedicalData.Cost}}</p>
                    </b-card>
                    <br>
                    <b-button @click="goWrite(MedicalData.MedicalNo)">수정하기</b-button><b-button @click="goBack">뒤로가기</b-button>
                </b-col>
            </b-form-row>
            {{MedicalData}}
        </b-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data1: this.$route.params.no,   //가져온 MedicalList no
            MedicalData: {},
        }
    },
    methods:{
        goBack(){       //뒤로가기
            this.$router.go(-1)
        },
        goWrite(num){   //수정하기
            this.$router.push({name:'MedicalWrite', params:{no: num}})
        }
    },
    created(){
        this.$http({
            url: '/medical/detail',
            method: 'post',
            data: {no: this.$route.params.no}
        }).then((res)=>{
            console.log(res);
            this.MedicalData = res.data[0];
        })
    }
}
</script>

<style>

</style>