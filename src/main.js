import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import store from './config/store'
import router from './config/router'
import vueToast from './plugins/vueToast'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vueToast,
  vuetify,
  render: h => h(App)
}).$mount('#app')
