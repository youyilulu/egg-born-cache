'use strict';

const assert = require('assert');

const CACHE_CLIENTS = Symbol('CacheContext#clients');

class CacheContext {
  constructor() {
    this[CACHE_CLIENTS] = new Map();
  }
  get clients() {
    return this[CACHE_CLIENTS];
  }
  use(name, strategy) {
    assert(!this.clients.has(name), `[egg-born-cache][CacheContext.use] strategy ${name} has been used,dont't use it again`);
    this.clients.set(name, strategy);
  }
  retrieve(name) {
    name = name || 'default';
    assert(this[CACHE_CLIENTS].size > 0 && this[CACHE_CLIENTS].has(name), `[egg-born-cache][CacheContext.retrieve] client ${name} not found, please use it with method [CacheStrategy.use(name,client)] first`);
    if (!name) {
      return [
        ...this[CACHE_CLIENTS].values(),
      ][0];
    }
    return this[CACHE_CLIENTS].get(name);
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

module.exports = CacheContext;
