import 'styles/common.styl';
import 'styles/resets.css';
import 'styles/fonts.css'
import App from './App.vue';
import router from './router';
import store from './store';
// import Vue from 'Vue';

const { Message, MessageBox } = ELEMENT;

Vue.config.productionTip = false;
Vue.use(ELEMENT);
Vue.prototype.bus = new Vue();
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
