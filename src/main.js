import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
new Vue({
  render: h => h(App),
}).$mount('#app')
