import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);

Vue.config.productionTip = false

//variable global
Vue.prototype.$localhost = "http://localhost:3000/";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
