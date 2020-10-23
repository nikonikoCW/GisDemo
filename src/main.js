// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import  '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css';
import VueiClient from '@supermap/vue-iclient3d-webgl';
Vue.use(VueiClient);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
