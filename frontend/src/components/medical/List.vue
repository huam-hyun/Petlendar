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
                    펫
                </b-col>
                <b-col cols="auto">
                    
                </b-col>
            </b-row>
            <b-row v-for="item in getData" :key="item.MedicalNo" class="listContent">
                <b-card>
                    <b-row align-h="center" class="listItem">
                        <b-col cols="2">
                            {{item.MedicalDate}}
                        </b-col>
                        <b-col cols="4">
                            {{item.Cause}}
                        </b-col>
                        <b-col cols="2">
                            {{item.PetName}}
                        </b-col>
                        <b-col v-b-toggle="'medical-collapse-'+item.MedicalNo" cols="auto">
                            ▼
                        </b-col>
                    </b-row>
                    <b-row align-h="center">
                        <b-col cols="7">
                            <b-collapse :id="'medical-collapse-'+item.MedicalNo">
                                <b-form class="collapseItem">
                                    <b-card>
                                        <label for="datepicker">날짜</label>
                                        <v-date-picker
                                            trim-weeks
                                            title-position="left"
                                            v-model="item.MedicalDate"
                                            :model-config="modelConfig"
                                            id="datepicker"
                                        >
                                            <template v-slot="{ inputValue, togglePopover }">
                                                <b-input-group>
                                                    <template #prepend>
                                                        <b-button
                                                            :disabled="readonly"
                                                            variant="outline-secondary"
                                                            @click="togglePopover()"
                                                        ><img src="@/assets/calendar.png" width="20px" height="20px"></b-button>
                                                    </template>
                                                    <b-form-input
                                                        :readonly="readonly"
                                                        :value="inputValue"
                                                        placeholder="날짜를 선택하세요"
                                                    />
                                                </b-input-group>
                                            </template>
                                        </v-date-picker><br/>

                                        <label for="cause">내원이유</label>
                                        <b-form-input
                                            :readonly="readonly"
                                            id="cause"
                                            v-model="item.Cause"
                                            placeholder="구토, 기침 등"
                                        ></b-form-input><br/>

                                        <label for="content">특이사항</label>
                                        <b-form-input
                                            id="content"
                                            v-model="item.Content"
                                            :readonly="readonly"
                                        /><br>

                                        <label for="prescription">처방</label>
                                        <b-form-textarea
                                            id="prescription"
                                            v-model="item.Prescription"
                                            :readonly="readonly"
                                        ></b-form-textarea><br/>

                                        <label for="cost">비용</label>
                                        <b-input-group append="₩">
                                            <b-form-input
                                                id="cost"
                                                type="number"
                                                v-model="item.Cost"
                                                :readonly="readonly"
                                            />
                                        </b-input-group>
                                        <br/>
                                        <b-button @click="writeOn(item)" v-if="readonly" variant="outline-primary">수정하기</b-button>
                                        <b-button @click="updateData(item)" variant="outline-primary" v-else-if="!readonly">수정완료</b-button>
                                    </b-card>
                                </b-form>
                            </b-collapse>
                        </b-col>
                    </b-row>
                </b-card>
            </b-row>
        </b-container>
        <b-button to="/Medical/Write">작성하기</b-button>
    </div>
</template>

<script>
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
const medicalStore = createNamespacedHelpers('medicalStore')

export default {
    data(){
        return{
            readonly: true,
            modelConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD'
            },
            data: {}
        }
    },
    methods:{
        writeOn(item){
            this.data = item
            this.readonly = !this.readonly
        },
        updateData(item){
            axios({
                url: '/medical/data',
                method: 'put',
                data: item
            })
            this.readonly = !this.readonly
        },
        reset(){
        }
    },
    computed:{
        ...medicalStore.mapGetters(['getData'])
    }
}
</script>

<style>
.listHeader{
   font-size: 20px;
   font-weight: bold;
}
.listContent{
    /* 가운데 정렬 */
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
.listItem{
    height: 30px;
}
.collapseItem{
    text-align: left;
}
</style>