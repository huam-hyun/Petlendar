<template>
    <div>
        PetName's 의료일지 작성
        <b-container>
            <b-form v-on:submit="onSubmit" class="medicalForm">
                <b-col md="6" offset-md="3">
                    <b-card>
                    <b-form-group label="펫">
                        <b-form-checkbox-group
                            v-model="pets"
                            :options="options"
                        ></b-form-checkbox-group>
                    </b-form-group>
                    <br/>

                    <label for="datepicker">날짜</label>
                    <v-date-picker
                        trim-weeks
                        title-position="left"
                        v-model="MedicalData.MedicalDate"
                        :model-config="modelConfig"
                        id="datepicker"
                    >
                        <template v-slot="{ inputValue, togglePopover }">
                            <b-input-group>
                                <template #prepend>
                                    <b-button
                                        variant="outline-secondary"
                                        @click="togglePopover()"
                                    ><img src="@/assets/calendar.png" width="20px" height="20px"></b-button>
                                </template>
                                <b-form-input
                                    :value="inputValue"
                                    placeholder="날짜를 선택하세요"
                                    readonly
                                    required
                                ></b-form-input>
                            </b-input-group>
                        </template>
                    </v-date-picker>
                    <br>
                    <label for="cause">내원이유</label>
                    <b-form-input
                        id="cause"
                        v-model="MedicalData.Cause"
                        placeholder="구토, 기침 등"
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
        {{MedicalData}}<hr>
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
            MedicalData: {
                MedicalDate: '',
                Cause: '',
                Content: '',
                Prescription: '',
                Cost: 0,
                PetName: this.joinPetName,
                MasterID: this.getID
            },
            modelConfig:{
                type: 'string',
                mask: 'YYYY-MM-DD'
            },
            options: this.getPets,
            pets: []
        }
    },
    methods: {
        goList(){
            
        },
        onSubmit(event){
            event.preventDefault()
            this.postMedical(this.MedicalData)
        },
        ...medicalStore.mapActions(['postMedical'])
    },
    computed:{
        joinPetName(){
            return this.pets.join(' ')
        },
        ...userStore.mapGetters(['getID']),
        ...medicalStore.mapGetters(['getData']),
        ...petStore.mapGetters(['getPets']),
    },
    created(){
        if(this.$route.params.no){
            this.MedicalData = this.getData(this.$route.params.no)
        }
    }
}
</script>

<style>
.medicalForm{
    text-align: left;
}
</style>