import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './modules/userStore'
import petStore from './modules/petStore'
import calendarStore from './modules/calendarStore'
import medicalStore from './modules/medicalStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userStore,
        medicalStore,
        calendarStore,
        petStore
    }
})