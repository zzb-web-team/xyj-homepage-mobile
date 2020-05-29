// import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

Vue.config.productionTip = false

import rem from './common/js/rem.js'
import common from './common/js/util.js'
Vue.use(rem)
Vue.prototype.common = common
import './common/css/reset.less'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('@/assets/languages/zh.json'),
    'en': require('@/assets/languages/en.json')
  }
})
//  import './assets/css/mui.less'
//  import mui from './assets/js/mui.js'
//  Vue.prototype.mui = mui
// import store from './store/index'
// import axios from 'axios'
// Vue.prototype.$axios=axios
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
// import Bridge from './config/bridge.js'
//   Vue.prototype.$bridge = Bridge

  import VueScroller from "vue-scroller"
  Vue.use(VueScroller);
  import Loading from './common/global/loading'
  Vue.use(Loading)
  
// import { post, put, patch, Get } from './common/js/http';

// Vue.prototype.$post=post
// Vue.prototype.$get=Get
// Vue.prototype.$put=put
// Vue.prototype.$patch=patch

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  // store,
  render: h => h(App)
})
