import io from 'socket.io';

export class Routes {
  controllers: any;
  routes: any;

  constructor(controllers: object) {
    this.controllers = controllers;
    this.routes = {};
  }

  setRoutes() {
    for (const name in this.controllers) {
      const methods = this.getAllMethodNames(this.controllers[name]);
      for (const method of methods) {
        this.routes[`${name}.${method}`] = {
          methodName: method,
          controller: name
        };
      }
    }
  }

  getAllMethodNames(obj) {
    const ignoreMethods = [
      'constructor',
      '__defineGetter__',
      '__defineSetter__',
      'hasOwnProperty',
      '__lookupGetter__',
      '__lookupSetter__',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toString',
      'valueOf',
      '__proto__',
      'toLocaleString'
    ];

    const methods = [];
    while ((obj = Reflect.getPrototypeOf(obj))) {
      const keys = Reflect.ownKeys(obj);
      keys.forEach((k: any) => {
        if (!ignoreMethods.includes(k)) {
          methods.push(k);
        }
      });
    }
    return methods;
  }

  init(socket: any) {
    for (const route in this.routes) {
      console.log('init socket', socket.id, socket.connected, route);
      socket.on(route, async (data, callback) => {

        const controller = route.substring(0, route.indexOf('.'));
        const method = route.substring(route.indexOf('.') + 1, route.length);
        callback(await this.controllers[controller][method](data));
      });
    }
  }
}
