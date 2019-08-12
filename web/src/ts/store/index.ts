import 'reflect-metadata';
import Vue from 'vue';
import Vuex from 'vuex';

import {getModule} from 'vuex-module-decorators';
import {Messages} from './messages';
import {Members} from './members';
import { Auth } from "./auth";

const Store = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    messages: Messages,
    members: Members,
    auth: Auth
  }
};

Vue.use(Vuex);

export const store = new Vuex.Store(Store);

export const messagesModule = getModule(Messages, store);
export const membersModule = getModule(Members, store);
export const authModule = getModule(Auth, store);
