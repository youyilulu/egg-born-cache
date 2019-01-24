'use strict';
const assert = require('assert');
const redis = require('redis');

const CacheStrategy = require('../cache-strategy');

class RedisCacheStrategy extends CacheStrategy {
  constructor(options) {
    assert(options.host && options.port,
      `[egg-born-cache] 'host: ${options.host}', 'port: ${options.port}' are required on config[Symbol.for('EggBorn#CacheStrategy#redis')]`);
    const client = redis.createClient(options);
    super(client);
  }
  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
  set(key, value) {
    this.client.set(key, value);
  }
}

module.exports = RedisCacheStrategy;
