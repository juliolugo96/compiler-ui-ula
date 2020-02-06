import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'vue-code-highlight/themes/prism.css'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')


