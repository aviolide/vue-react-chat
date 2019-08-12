import Vue from 'vue';
import {profileRouter} from './profile';
import {messagesRouter} from './messages';
import {mainRouter} from './global/behavior';
import {authRouter} from './auth';
import VueRouter from 'vue-router';

const routes = [
  profileRouter,
  messagesRouter,
  authRouter,
  {
    path: '/',
    redirect: 'auth'
  }
];

Vue.use(VueRouter);

export const router = new VueRouter({routes});

mainRouter(router);
