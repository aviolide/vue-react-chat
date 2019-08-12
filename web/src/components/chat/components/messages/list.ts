import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {membersModule, messagesModule} from '../../../../ts/store';
import VueTypes from 'vue-types';

@Component({})
export default class MessagesList extends Vue {
  @Prop(VueTypes.number.def(1)) memberId: number;

  get list() {
    console.log('messages list', messagesModule.getById(this.memberId));
    return messagesModule.getById(this.memberId);
  }
  created() {}
}
