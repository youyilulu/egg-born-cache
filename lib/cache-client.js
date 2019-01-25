'use strict';

const { promisify } = require('util');

const PROMISE_GET = Symbol('EggBorn#cacheStrategy#get');
const PROMISE_SET = Symbol('EggBorn#cacheStrategy#set');
const PROMISE_DEL = Symbol('EggBorn#cacheStrategy#del');

class CacheClient {
  constructor(client) {
    this.client = client;
    this[PROMISE_GET] = promisify(this.client.get).bind(this.client);
    this[PROMISE_SET] = promisify(this.client.set).bind(this.client);
    this[PROMISE_DEL] = promisify(this.client.del).bind(this.client);
  }
  get(...args) {
    return this[PROMISE_GET](...args);
  }
  set(...args) {
    return this[PROMISE_SET](...args);
  }
  del(...args) {
    return this[PROMISE_DEL](...args);
  }
}

module.exports = CacheClient;
