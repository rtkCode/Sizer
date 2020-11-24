import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import history from "../src/history.js"
import global from "../src/global.js"

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.prototype.$$history = history
Vue.prototype.$$global = global

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
