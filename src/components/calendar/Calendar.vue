<template>
    <div>   
        <b-container fluid>
            <b-row>
                <b-col cols="4">
                    <b-calendar width="320px" v-model="date" @context="onContext" :hide-header="true"></b-calendar>
                </b-col>
                <b-col>
                    <b-card>
                        <b-card-header>
                            {{date}}
                        </b-card-header>
                        특이사항 나타낼 부분

                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <b-button>리스트보기</b-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            date: '',
        }
    },
    methods: {
         onContext(ctx){
             this.context = ctx    
         }
    }
}
</script>

<style>

</style>