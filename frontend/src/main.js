import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router/index.js'
import axios from 'axios'
import store from './store/index.js'
import VCalendar from 'v-calendar'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// v-calendar
Vue.use(VCalendar)

Vue.config.productionTip = false
Vue.prototype.$http = axios;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
