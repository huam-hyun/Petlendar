import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/userStore'
import Calendar from './modules/calendarStore'
import Medical from './modules/medicalStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: User,
        Medical: Medical,
        Calendar: Calendar
    }
})