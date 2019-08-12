import {Endpoint} from './endpoint';

export default class Handler {
  endpoint: Endpoint;
  name: string;
  realMethods: string[] = ['on', 'off', 'connect', 'disconnect'];

  constructor(name: string, endpoint: any) {
    this.name = name;
    this.endpoint = endpoint;
  }

  get(target: {}, prop: string): any {
    console.log('handler', target, prop);
    if (this.realMethods.includes(prop)) {
      return (event: string, callback: CallableFunction) => {
        const ev = this.endpoint.io[prop](event, callback);
        console.log('event', event, prop, this.endpoint, ev);
        return ev;
      };
    }
    return async (...args) => {
      const result = await this.endpoint.call(this.name, prop, ...args);
      console.log('result', result);
      return result;
    };
  }
}
