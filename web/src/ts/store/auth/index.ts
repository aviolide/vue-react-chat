import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

@Module({name: 'auth', namespaced: true})
export class Auth extends VuexModule {
  isAuth: boolean = false;

  get getAuth() {
    return this.isAuth;
  }

  @Mutation
  setAuth(isAuth) {
    this.isAuth = isAuth;
  }

  @Action
  async load() {
    console.log('load auth', this.isAuth);
    const auth = await localStorage.getItem('username');
    if (auth) {
      console.log('load auth', localStorage.getItem('username'));
      this.setAuth(true);
    }
  }

  @Action
  logout() {
    this.setAuth(false);
    localStorage.removeItem('username');
  }
}
