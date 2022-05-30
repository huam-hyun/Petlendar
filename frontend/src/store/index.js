import Vue from 'vue'
import Vuex from 'vuex'

import UserInfo from './modules/user'
import Calendar from './modules/calendar'
import Medical from './modules/medical'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: UserInfo,
        Medical: Medical,
        Calendar: Calendar
    }
})