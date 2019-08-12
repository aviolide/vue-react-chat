import {Component, Vue, Watch} from 'vue-property-decorator';
import '../sass/app.sass';
import Messages from './chat/index.vue';
import {authModule, membersModule, messagesModule} from '../ts/store';
import {api} from '../Connect';
import MemberList from './chat/components/members/list';
import Auth from './auth/auth.vue';
import {router} from '../ts/routes';

@Component({
  components: {Messages, Auth}
})
export default class App extends Vue {

  get isAuth() {
    return authModule.isAuth;
  }

  @Watch('isAuth')
  onAuth() {
    this.$router.push({name: 'chat'});
  }
  created() {
    console.log('created');
    this.setData();
  }

  async setData() {
    console.log('setdata');
    await messagesModule.load();
    await membersModule.load();
  }
}
