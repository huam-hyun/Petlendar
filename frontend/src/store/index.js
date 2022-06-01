import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './modules/userStore'
import Calendar from './modules/calendarStore'
import Medical from './modules/medicalStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userStore,
        medical: Medical,
        calendar: Calendar
    }
})