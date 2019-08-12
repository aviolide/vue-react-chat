import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';
import {IMember, IMessage} from '../../../../../src/utils/types';
import _ from 'lodash';
import {api} from '../../../Connect';
import {membersModule} from '../index';

@Module({name: 'members', namespaced: true})
export class Members extends VuexModule {
  list: Array<IMember> = [];

  get getList() {
    return this.list;
  }

  @Mutation
  set(list: Array<IMember>) {
    this.list = list;
  }

  @Mutation
  add(data: IMember) {
    this.list.push(data);
  }

  get getById() {
    return (id) => {
      return _.find(this.list, {id});
    };
  }

  get getAdmin() {
    return _.find(this.list, {role: 'admin'});
  }

  @Action
  async load() {
    const listMembers = await api.members.get();
    this.set(listMembers);
    console.log(listMembers);
  }
}
