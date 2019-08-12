import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {IMember} from '../../../../../../src/utils/types';
import {membersModule} from '../../../../ts/store';

@Component({})
export default class MemberList extends Vue {
  get list() {
    console.log('member list', membersModule.list);
    return membersModule.list;
  }
  created() {}
}
