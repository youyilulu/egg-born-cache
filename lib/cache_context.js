'use strict';

const assert = require('assert');

const CACHE_CLIENTS = Symbol('CacheContext#clients');
const CACHE_CLIENT_DEFAULT = Symbol('CacheContext#default');

class CacheContext {
  constructor() {
    this[CACHE_CLIENTS] = new Map();
    this[CACHE_CLIENT_DEFAULT] = null;
  }
  get clients() {
    return this[CACHE_CLIENTS];
  }
  /**
   * 设置默认缓存策略
   * @param {String} name 缓存策略名
   */
  setDefault(name) {
    this[CACHE_CLIENT_DEFAULT] = this.retrieve(name);
  }
  /**
   * 使用策略
   * @param {String} name 策略明
   * @param {Object} strategy 策略对象 @see CacheStrategy
   */
  use(name, strategy) {
    assert(
      !this[CACHE_CLIENTS].has(name),
      `[egg-born-cache][CacheContext.use] strategy ${name} has been used,dont't use it again`
    );
    this[CACHE_CLIENTS].set(name, strategy);
  }
  /**
   * 获取缓存策略
   * @param {String} name 策略名
   * @return {Object} 策略对象
   */
  retrieve(name) {
    name = name || 'default';
    assert(
      this[CACHE_CLIENTS].size > 0 && this[CACHE_CLIENTS].has(name),
      `[egg-born-cache][CacheContext.retrieve] client ${name} not found, please use it with method [CacheStrategy.use(name,client)] first`
    );
    if (!name) {
      return [...this[CACHE_CLIENTS].values()][0];
    }
    return this[CACHE_CLIENTS].get(name);
  }
  get(...args) {
    return this[CACHE_CLIENT_DEFAULT].get(...args);
  }
  set(...args) {
    return this[CACHE_CLIENT_DEFAULT].set(...args);
  }
  del(...args) {
    return this[CACHE_CLIENT_DEFAULT].del(...args);
  }
}

module.exports = CacheContext;
