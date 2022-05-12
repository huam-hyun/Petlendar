<template>
    <div>
        PetName's 의료일지 작성
        <b-container>
            <b-form-row class="medicalForm">
                <b-col md="6" offset-md="3">
                    <b-card>
                    <label for="datepicker">날짜</label>
                    <b-form-datepicker v-model="data.date" id="datepicker" placeholder="날짜를 선택하세요"></b-form-datepicker>
                    <br>
                    <label for="cause">내원이유</label>
                    <b-form-input
                        id="cause"
                        v-model="data.cause"
                        placeholder="구토, 기침, 초콜릿 먹음 등"
                        required
                    ></b-form-input>
                    <br>
                    <label for="text">내용</label>
                    <b-form-textarea
                        id="text"
                        v-model="data.text"
                        placeholder="증상, 발현기간 등 특이사항"
                    ></b-form-textarea>
                    <br>
                    <label for="prescription">처방</label>
                    <b-form-textarea
                        id="prescription"
                        v-model="data.prescription"
                        placeholder="수의사의 지시사항, 약 복용기간 등"
                    ></b-form-textarea>
                    <br>
                    <label for="cost">비용</label>
                    <b-input-group append="₩">
                        <b-form-input
                            type="number"
                            id="cost"
                            v-model="data.cost"
                        ></b-form-input>
                    </b-input-group>
                    </b-card>
                    <b-button @click="goList()">작성하기</b-button>
                </b-col>
            </b-form-row>
        </b-container>
    </div>
</template>

<script>
import PetData from '@/data/PetData'

export default {
    data(){
        return{
            data: this.$route.params.no ? PetData[this.$route.params.no-1] : {
                no: '',
                date: '',
                cause: '',
                text: '',
                prescription: '',
                cost: '',
                petname: '',
                master: ''
            },   //수정할 MedicalList no
        }
    },
    methods: {
        goList(){
            if(this.$route.params.no){
                this.$router.push({name: 'MedicalList'})
            }else{
                this.data.no = PetData.length + 1
                PetData.push(this.data)
                this.$router.push({name: 'MedicalList'})
            }
            
        }
    }
}
</script>

<style>
.medicalForm{
    text-align: left;
}
</style>