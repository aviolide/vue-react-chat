import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {IMessage} from '../../../../../src/utils/types';
import _ from 'lodash';
import {api} from '../../../Connect';
import {messagesModule} from '../index';

@Module({name: 'messages', namespaced: true})
export class Messages extends VuexModule {
  list: Array<IMessage> = [];

  get() {
    return this.list;
  }

  @Mutation
  set(list: Array<IMessage>) {
    this.list = list;
  }

  @Mutation
  add(item: IMessage) {
    this.list.push(item);
  }

  get getById() {
    return (memberId) => {
      return _.filter(this.list, {memberId});
    };
  }

  @Action
  async load() {
    const listMessages = await api.messages.get();
    this.set(listMessages);
    console.log(listMessages);
  }
}
