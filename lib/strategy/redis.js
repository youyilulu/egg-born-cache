'use strict';
const assert = require('assert');

const CacheStrategy = require('../cache-strategy');

class RedisCacheStrategy extends CacheStrategy {
  constructor(options) {
    super();
    assert(options.host && options.port,
      `[egg-born-cache] 'host: ${options.host}', 'port: ${options.port}' are required on config[Symbol.for('EggBorn#CacheStrategy#redis')]`);
  }
  get() {
    return 'redis';
  }
}

module.exports = RedisCacheStrategy;
