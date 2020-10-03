import Vue from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'
import { auth } from './config/firebase'

import vuetify from './plugins/vuetify'
import vueToast from './plugins/vueToast'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false

let app  = '';
auth.onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      store,
      router,
      vueToast,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})
