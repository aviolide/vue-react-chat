class Listeners {
  list: any = [];

  constructor() {}

  listen(route: string, callback) {
    this.list[route] = [];
    this.list[route].push(callback);
  }

  notify(query: any, data) {
    for (const notify of this.list[query]) {
      console.log(this.list);
      notify(data);
    }
  }
}
export const listeners = new Listeners();
