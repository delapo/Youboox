// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VuexUndoRedo from '../build/plugin.js'

Vue.use(VuexUndoRedo)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  name: 'App',
  router,
  components: { App },
  template: '<App/>'
})
