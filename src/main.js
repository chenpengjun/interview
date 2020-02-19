import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import 'amfe-flexible';
import VueProgressBar from 'vue-progressbar'
import App from './App.vue'
import router from './router'
import store from './store'
import './reset.less'
Vue.config.productionTip = false
//整体引入
Vue.use(ElementUI);
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
