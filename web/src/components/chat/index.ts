import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import MemberList from './components/members/list';
import MessagesList from './components/messages/list';
import {api} from '../../Connect';
import {authModule, membersModule} from '../../ts/store';

@Component({components: {MemberList, MessagesList}})
export default class Index extends Vue {
  text: string = '';
  memberId: number = null;

  created() {
    this.setMember(1);
  }

  get currentMember() {
    return membersModule.getById(this.memberId);
  }

  get adminMember() {
    console.log('admin', membersModule.getAdmin);
    return membersModule.getAdmin;
  }

  async submit() {
    const data = {
      text: this.text,
      isSent: true,
      memberId: this.memberId,
      date: Date.now()
    };
    await api.messages.add(data);
    this.text = null;
  }

  setMember(id: number) {
    this.memberId = id;
    console.log('set member click', id);
  }

  logout() {
    authModule.logout();
    this.$router.push({name: 'auth'});
  }
}
