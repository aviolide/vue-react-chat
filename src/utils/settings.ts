import {MainSettings, TypeModules} from './main-settings';
import mysql from 'promise-mysql';
import express from 'express';
import socketIo from 'socket.io';
import http from 'http';
import Sequelize from 'sequelize';
import {awaitExpression} from 'babel-types';

export class Settings extends MainSettings {
  moduleConnect: {[key: string]: any} = {
    messages: {
      connect: {},
      sequelize: {}
    }
  };

  constructor(name?: any) {
    super(name);
    this.moduleConnect = {
      messages: {},
      members: {}
    };
  }

  startServer(onConnected: Function) {
    const port = this.configs.chat.port;
    const app = express();
    const server = http.createServer(app);

    server.listen(port, '0.0.0.0');

    server.on('error', (err) => {
      console.error(err);
    });
    server.on('listening', () => {
      console.log(`Listening server ${module} on port ${port}`);
    });

    const io = socketIo.listen(server);

    io.sockets.on('connection', onConnected);
    return app;
  }

  async initDatabase(models: any) {
    const config = this.dbConfig();
    const moduleName = this.name;
    // @ts-ignore
    const connect = new Sequelize(
      'postgres://postgres:postgres@postgres:5432/postgres'
    );

    const db = {};
    for (const file of models) {
      const model = connect.import(file);
      db[model.tableName] = model;
    }

    Object.keys(db).forEach((key) => {
      if ('associate' in db[key]) {
        db[key].associate(db);
      }
    });

    for (const key in db) {
      this.moduleConnect[moduleName][key] = db[key];
    }

    this.moduleConnect[moduleName].sequelize = connect;

    let retries = 5;
    while (retries) {
      try {
        await connect.sync({force: true});
        console.log('connection complete');
        break;
      } catch (e) {
        console.log(e);
        retries -= 1;
        console.log('retries left', retries);
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
  }

  getDb() {
    return this.moduleConnect[this.name];
  }

  dbConfig() {
    const database = this.configs.database;
    const config = {
      host: database.host,
      user: database.user,
      password: database.password,
      database: database.database,
      port: database.port,
      dialect: database.dialect,
      pool: {
        max: 70,
        min: 0,
        idle: 40000,
        acquire: 40000
      }
    };
    return config;
  }
}
