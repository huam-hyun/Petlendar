<template>
    <div>   
        <b-container fluid>
            <b-row align-h="around">
                <b-col cols="1"></b-col>
                <b-col cols="3">
                    <b-calendar block v-model="date" :hide-header="true"></b-calendar>
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
                                        <b-button @click="deleteData(memo)">X</b-button>
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
                                <b-row align-h="around">
                                    <b-col cols="10">
                                        <b-input v-model="content">

                                        </b-input>
                                    </b-col>
                                    <b-col>
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
        <b-button @click="save()">저장</b-button>
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
            CalendarData: [],
            content: '',
            forAddData: [],
            forDeleteData: [],
            num: 0
        }
    },
    methods: {
        addData(){
            const newData = {
                tempNo: this.num,
                WriteDate: this.date,
                Content: this.content,
                MasterID: 'test',
                PetID: 2
            }
            this.forAddData.push(newData);
            this.num++;
            console.log(this.forAddData);
            this.content = '';
        },
        deleteData(item){
            if(item.CalendarNo){
                // DB에 등록돼 있는 데이터는 CalendarNo가 있으니 삭제 요청을 위한 배열에 CalendarNo를 추가
                this.forDeleteData.push(item.CalendarNo);
                console.log(this.forDeleteData);
                const index = this.CalendarData.findIndex(e => e.CalendarNo === item.CalendarNo);
                this.CalendarData.splice(index, 1);
            }else{
                // 사용자가 입력해서 DB에 저장은 안됐지만 삭제할 데이터들
                const index = this.forAddData.findIndex(e => e.tempNo === item.tempNo);
                this.forAddData.splice(index, 1);
            }
        },
        goList(){
            
        },
        save(){
            if(this.forAddData.length){
                let data = [];
                for(let i = 0;i < this.forAddData.length; i++){
                    delete this.forAddData[i].tempNo;
                    data.push(Object.values(this.forAddData[i]))
                }
                this.forAddData=[]
                console.log(data)
                this.$http({
                    url: '/calendar/data',
                    method:'post',
                    data: data
                });
            }
            if(this.forDeleteData.length){
                this.$http({
                    url: '/calendar/data',
                    method: 'delete',
                    data: this.forDeleteData
                });
                this.forDeleteData=[]
            }
        }
    },
    computed: {
        selectedData : function(){
            // 불러온 CalendarDate를 먼저 temp에 push한 후 사용자가 새로 입력한 특이사항을 그 뒤에 push해준다
            let temp = [];
            for(let i = 0; i < this.CalendarData.length; i++){
                if(this.date === this.CalendarData[i].WriteDate){
                    temp.push(this.CalendarData[i]);
                }
            }
            for(let i = 0; i < this.forAddData.length; i++){
                if(this.date === this.forAddData[i].WriteDate){
                    temp.push(this.forAddData[i]);
                }
            }
            return temp
        } ,
    },
    created(){
        this.$http({
            url: '/calendar/data',
            method: 'get'
        }).then(res =>{
            this.CalendarData = res.data;
        })
    }
}
</script>

<style>

</style>