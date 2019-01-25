'use strict';

const assert = require('assert');

const CacheClient = require('./cache-client');
const CACHE_CLIENTS = Symbol.for('EggBorn#cacheStrategy#clients');

class CacheStrategy {
  constructor() {
    this.clients = new Map();
  }
  get [CACHE_CLIENTS]() {
    return this.clients;
  }
  use(name, client) {
    assert(!this.clients.has(name), `[egg-born-cache][CacheStrategy.use] client ${name} has been used,dont't use it again`);
    this.clients.set(name, new CacheClient(client));
  }
  retrieve(name) {
    assert(this.clients.size === 0 || !this.clients.has(name), `[egg-born-cache][CacheStrategy.retrieve] client ${name} not found, please use it with method [CacheStrategy.use(name,client)] first`);
    if (!name) {
      return [
        ...this.clients.values(),
      ][0];
    }
    return this.clients.get(name);
  }
  get(...args) {
    return this.retrieve().get(...args);
  }
  set(...args) {
    return this.retrieve().set(...args);
  }
  del(...args) {
    return this.retrieve().del(...args);
  }
}

module.exports = CacheStrategy;
