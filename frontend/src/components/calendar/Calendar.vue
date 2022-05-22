<template>
    <div>   
        <b-container fluid>
            <b-row align-h="around">
                <b-col cols="1"></b-col>
                <b-col cols="3">
                    <b-calendar block v-model="date" @context="onContext" :hide-header="true"></b-calendar>
                </b-col>
                <b-col cols="5">
                    <b-card>
                        <b-card-header>
                            {{date}}
                        </b-card-header>
                        <span v-if="selectedData.length">
                            <b-card v-for="memo in selectedData" :key="memo.CalendarNo">
                                <b-row>
                                    <b-col>
                                        {{memo.Content}}
                                    </b-col>
                                    <b-col cols="1">
                                        <b-button @click="deleteData(memo.CalendarNo)">X</b-button>
                                    </b-col>
                                </b-row>
                            </b-card>
                            <b-card>
                                <b-row>
                                    <b-col>
                                        <b-input v-model="content">

                                        </b-input>
                                    </b-col>
                                    <b-col cols="1">
                                        <b-button @click="addData()">V</b-button>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </span>
                        <span v-if="!selectedData.length">
                            <b-card>특이사항 없음</b-card>
                            <b-card>
                                <b-row>
                                    <b-col>
                                        <b-input v-model="content">

                                        </b-input>
                                    </b-col>
                                    <b-col cols="1">
                                        <b-button @click="addData()">V</b-button>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </span>

                    </b-card>
                </b-col>
                <b-col cols="1"></b-col>
            </b-row>
        </b-container>
        <b-button @click="goList()">리스트보기</b-button>
    </div>
</template>

<script>
export default {
    data(){
        let today = new Date();
        let month = today.getMonth() + 1
        if(month < 10) month = '0' + month
        let year = today.getFullYear()
        let day = today.getDate()
        today = `${year}-${month}-${day}`

        return{
            date: today,
            data: [],
            content: '',
        }
    },
    methods: {
        onContext(ctx){
            this.context = ctx    
        },
        addData(){
            const data = {
                no : this.data.length + 1,
                date : this.date,
                content : this.content,
                petname: '휴이',
                master : '박상현',
            }
            this.data.push(data)
            this.content = ''
        },
        deleteData(no){
            this.data = this.data.filter(x => x.no != no)
        },
        goList(){
            this.$router.push({name: 'CalendarList'});
        }
    },
    computed: {
        selectedData : function(){
            let temp = [];
            for(let i = 0; i < this.data.length; i++){
                if(this.date === this.data[i].date){
                    temp.push(this.data[i]);
                }
            }
            return temp
        } ,
    },
}
</script>

<style>

</style>