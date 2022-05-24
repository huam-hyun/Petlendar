<template>
    <div>
        PetName's 의료일지 작성
        <b-container>
            <b-form v-on:submit="onSubmit" class="medicalForm">
                <b-col md="6" offset-md="3">
                    <b-card>
                    <label for="datepicker">날짜</label>
                    <b-form-datepicker v-model="MedicalData.MedicalDate" id="datepicker" placeholder="날짜를 선택하세요"></b-form-datepicker>
                    <br>
                    <label for="cause">내원이유</label>
                    <b-form-input
                        id="cause"
                        v-model="MedicalData.Cause"
                        placeholder="구토, 기침 등"
                        required
                    ></b-form-input>
                    <br>
                    <label for="text">내용</label>
                    <b-form-textarea
                        id="text"
                        v-model="MedicalData.Content"
                        placeholder="증상, 발현기간 등 특이사항"
                    ></b-form-textarea>
                    <br>
                    <label for="prescription">처방</label>
                    <b-form-textarea
                        id="prescription"
                        v-model="MedicalData.Prescription"
                        placeholder="수의사의 지시사항, 약 복용기간 등"
                    ></b-form-textarea>
                    <br>
                    <label for="cost">비용</label>
                    <b-input-group append="₩">
                        <b-form-input
                            type="number"
                            id="cost"
                            v-model="MedicalData.Cost"
                        ></b-form-input>
                    </b-input-group>
                    </b-card>
                    <b-button type="submit">작성하기</b-button>
                </b-col>
            </b-form>
        </b-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            MedicalData: {
                MedicalNo: undefined,
                MedicalDate: '',
                Cause: '',
                Content: '',
                Prescription: '',
                Cost: undefined,
                PetID: 2,       // PetID와 MasterID는 개인정보에서 가져오기
                MasterID: 'test'
            }
        }
    },
    methods: {
        goList(){
            
        },
        onSubmit(event){
            event.preventDefault()
            if(this.$route.params.MedicalData){
                this.$http({
                    url: '/medical/update',
                    method: 'post',
                    data: this.MedicalData
                }).then((res)=>{
                    console.log(res);
                    this.$router.push({name:'MedicalList'});
                })
            }else{
                this.$http({
                    url: '/medical/write',
                    method: 'post',
                    data: this.MedicalData
                }).then((res)=>{
                    console.log(res);
                    this.$router.push({name:'MedicalList'})
                });
            }
        }
    },
    created(){
        if(this.$route.params.MedicalData){
            this.MedicalData = this.$route.params.MedicalData;
        }
    }
}
</script>

<style>
.medicalForm{
    text-align: left;
}
</style>