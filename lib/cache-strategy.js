'use strict';

class CacheStrategy {
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

module.exports = CacheStrategy;
