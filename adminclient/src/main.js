import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入封装了的axios
import axios from './http.js'

// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入css重置样式
import './assets/css/reset1.css'

// 引入iconfont
import '../src/assets/iconfont/iconfont.css'

Vue.use(ElementUI)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
