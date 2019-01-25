'use strict';
const assert = require('assert');
const redis = require('redis');

const CacheStrategy = require('../cache-strategy');

class RedisCacheStrategy extends CacheStrategy {
  constructor(options) {
    const client = options.client;
    const clients = options.clients;
    assert(client || clients, '[egg-born-cache] client configuration missing, named either client or clients');

    assert(client.host && client.port,
      `[egg-born-cache] 'host: ${client.host}', 'port: ${client.port}' are required on config.redis`);
    super('redis', redis.createClient(client));
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
