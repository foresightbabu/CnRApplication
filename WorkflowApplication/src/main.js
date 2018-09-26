// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { store } from './_store';
import App from './App'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import router from './router'
import './ml'

Vue.use(BootstrapVue);
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
