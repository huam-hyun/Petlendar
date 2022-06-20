<template>
    <div>
        의료일지 작성
        <b-container>
            <b-form v-on:submit="onSubmit" class="medicalForm">
                <b-col md="6" offset-md="3">
                    <b-card>
                    <label for="datepicker">날짜</label>
                    <v-date-picker trim-weeks title-position="left" v-model="date" :model-config="modelConfig" id="datepicker">
                        <template v-slot="{ inputValue, inputEvents }">
                            <b-form-input
                                placeholder="날짜를 선택하세요"
                                :value="inputValue"
                                v-on="inputEvents"
                                required
                                readonly
                            />
                        </template>
                    </v-date-picker>
                    <br>
                    <label for="cause">내원이유</label>
                    <b-form-input
                        id="cause"
                        v-model="cause"
                        placeholder="구토, 기침 등"
                    ></b-form-input>
                    <br>
                    <label for="text">내용</label>
                    <b-form-textarea
                        id="text"
                        v-model="content"
                        placeholder="증상, 발현기간 등 특이사항"
                    ></b-form-textarea>
                    <br>
                    <label for="prescription">처방</label>
                    <b-form-textarea
                        id="prescription"
                        v-model="prescription"
                        placeholder="수의사의 지시사항, 약 복용기간 등"
                    ></b-form-textarea>
                    <br>
                    <label for="cost">비용</label>
                    <b-input-group append="₩">
                        <b-form-input
                            type="number"
                            id="cost"
                            v-model="cost"
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
import {createNamespacedHelpers} from 'vuex'
const userStore = createNamespacedHelpers('userStore')
const petStore = createNamespacedHelpers('petStore')
const medicalStore = createNamespacedHelpers('medicalStore')

export default {
    data(){
        return{
            date: '',
            cause: '',
            content: '',
            prescription: '',
            cost: 0,
            pet: [],
            modelConfig:{
                type: 'string',
                mask: 'YYYY-MM-DD'
            },
        }
    },
    methods: {
        goList(){
            
        },
        async onSubmit(event){
            event.preventDefault()
            const payload = {
                MedicalDate: this.date,
                Cause: this.cause,
                Content: this.content,
                Prescription: this.prescription,
                Cost: this.cost,
                PetName: '콩이',
                MasterID: this.getID,
            }
            const res = await this.postMedical(payload)

            if(res.status === 200){
                await this.getMedical(this.getID)
                alert('등록 완료')
                this.$router.push({name: 'MedicalList'})
            }
        },
        ...medicalStore.mapActions(['getMedical', 'postMedical'])
    },
    computed:{
        ...userStore.mapGetters(['getID']),
        ...petStore.mapGetters(['getPets']),
    },
}
</script>

<style>
.medicalForm{
    text-align: left;
}
</style>