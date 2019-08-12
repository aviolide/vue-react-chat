import 'reflect-metadata';
import Vue from 'vue';
import {store} from './ts/store';
import {router} from './ts/routes';
import App from './components/app.vue';
import {sync} from 'vuex-router-sync';
import Icon from './components/common/icon.vue';

Vue.component('Icon', Icon);

sync(store, router);
window.onload = () => {
  new Vue({
    store,
    router,
    render: (h) => h(App)
  }).$mount('#app');
};
