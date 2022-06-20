<template>
    <div>
        <b-container>
            <b-row v-for="item in pets" :key="item.MasterID">
                <b-col>
                    불러온 펫 데이터
                    <b-card>
                        이름: {{item.PetName}}<br>
                        성별: {{item.Sex}}<br>
                        종류: {{item.PetType}}
                    </b-card>
                </b-col>
                <b-col>
                    불러온 캘린더 데이터
                    <b-card v-for="item in calendarData" :key="item.CalendarNo">
                        내용 : {{item.Content}}<br>
                        ID : {{item.MasterID}}<br>
                        펫 : {{item.PetName}}<br>
                        작성날짜 : {{item.WriteDate}}
                    </b-card>
                </b-col>
                <b-col>
                    불러온 의료 데이터
                    <b-card v-for="item in medicalData" :key="item.MedicalNo">
                        내원이유 : {{item.Cause}}<br>
                        증상 : {{item.Content}}<br>
                        비용 : {{item.Cost}}<br>
                        ID : {{item.MasterID}}<br>
                        내원날짜 : {{item.MedicalDate}}<br>
                        펫 : {{item.PetName}}<br>
                        처방 : {{item.Prescription}}
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const calendarStore = createNamespacedHelpers('calendarStore')
const medicalStore = createNamespacedHelpers('medicalStore')
const userStore = createNamespacedHelpers('userStore')
const petStore = createNamespacedHelpers('petStore')

export default {
    data(){
        return{
            
        }
    },
    methods:{
        
    },
    created(){
        
    },
    computed: {
        // States
        ...userStore.mapState(['userName', 'userID']),
        ...petStore.mapState(['pets']),
        ...calendarStore.mapState(['calendarData']),
        ...medicalStore.mapState(['medicalData'])
    }
}
</script>