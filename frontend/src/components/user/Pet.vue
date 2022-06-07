<template>
    <div>
        <b-container>
            {{userID}}
            <b-form v-on:submit="onSubmit" class="petForm">
                <b-col md="6" offset-md="3">
                    <b-card>
                    <br>
                    <label for="name">이름</label>
                    <b-form-input
                        id="name"
                        v-model="name"
                        required
                    ></b-form-input>
                    <br>
                    <b-form-group label="성별">
                        <b-form-radio-group
                            v-model="sex"
                            :options="options"
                        >
                        </b-form-radio-group>
                    </b-form-group>
                    <br>
                    <label for="type">종류</label>
                    <b-form-input
                        id="type"
                        v-model="type"
                        placeholder="개, 고양이 등"
                    ></b-form-input>
                    <br>
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

    export default{
        data(){
            return{
                options: [
                    {value: 'm', text: '남'},
                    {value: 'f', text: '여'}
                ],
                name: '',
                sex: '',
                type: ''
            }
        },
        methods:{
            ...userStore.mapActions(['registerPet']),
            onSubmit(event){
                event.preventDefault()
                if(!this.userID){
                    alert('로그인이 필요합니다')
                    this.$router.push({name: 'Main'})
                }else{
                    console.log(this.userID)
                    const data = {
                        masterID: this.userID,
                        name: this.name,
                        sex: this.sex,
                        type: this.type
                    }
                    this.registerPet(data)
                }
            }
        },
        computed:{
            ...userStore.mapState(['userID'])
        }
    }
</script>