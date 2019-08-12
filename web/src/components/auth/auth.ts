import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {authModule, membersModule, messagesModule} from '../../ts/store';
import {api} from '../../Connect';
import {IMember} from '../../../../src/utils/types';

@Component({})
export default class Auth extends Vue {
  username: string = '';
  firstname: string = '';
  lastname: string = '';
  country: string = '';

  errors = {
    username: true,
    firstname: false,
    lastname: false,
    country: false
  };
  created() {
    console.log('created r', this.$route);
    authModule.load();
  }

  async check() {
    if (this.username && this.firstname && this.lastname && this.country) {
      authModule.setAuth(true);
      localStorage.setItem('username', this.username);
      await this.$router.push({name: 'chat'});
      const data: IMember = {
        username: this.username,
        lastname: this.lastname,
        firstname: this.firstname,
        country: this.country,
        role: 'admin'
      };
      await api.members.add(data);
    }
  }
}
