import Vue from 'vue'
import Router from 'vue-router'

//메인화면
import Main from '@/components/Main.vue'

//캘린더
import CalendarList from '@/components/calendar/List.vue'
import CalendarView from '@/components/calendar/Calendar.vue'

//의료일지
import MedicalList from '@/components/medical/List.vue'
import MedicalDetail from '@/components/medical/Detail.vue'
import MedicalWrite from '@/components/medical/Write.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/calendar/list',
            name: 'CalendarList',
            component: CalendarList
        },
        {
            path: '/calendar/view',
            name: 'CalendarWrite',
            component: CalendarView
        },
        {
            path: '/medical/list',
            name: 'MedicalList',
            component: MedicalList
        },
        {
            path: '/medical/write',
            name: 'MedicalWrite',
            component: MedicalWrite
        },
        {
            path: '/medical/detail',
            name: 'MedicalDetail',
            component: MedicalDetail
        },
    ]
})