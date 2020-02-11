import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
  }
  if (localStorage.getItem("loginState")) {
    if (to.path) {
      store.commit('changePath', to.path.split('/')[1])
    }
    next()
  } else {
    next("/login")
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')