'use strict';

const CACHE_CLIENT = Symbol.for('EggBorn#cacheStrategy#client');

class CacheStrategy {
  constructor(client) {
    this.client = client;
  }
  get [CACHE_CLIENT]() {
    return this.client;
  }
  get() {
    throw new Error('method [CacheStrategy.get] not implemented');
  }
  set() {
    throw new Error('method [CacheStrategy.set] not implemented');
  }
  del() {
    throw new Error('method [CacheStrategy.del] not implemented');
  }
}

exports.promisify = () => {

};

module.exports = CacheStrategy;
