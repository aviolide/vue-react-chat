import {authModule} from '../../store';

export const mainRouter = (router) => {
  router.beforeEach((to, from, next) => {
    console.log('route', from, to, authModule.getAuth);
    if (to.name === 'auth' && authModule.getAuth) {
      console.log('auth');
      return next({name: 'chat'});
    }
    if (to.name === 'chat' && authModule.getAuth) {
      console.log('chat');
      return next();
    }
    if (!authModule.getAuth && to.name === 'chat') {
      console.log('not auth');
      return next({name: 'auth'});
    }

    return next();
  });
};
